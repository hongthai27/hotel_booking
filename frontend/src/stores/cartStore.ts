import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { toast } from 'sonner';

interface CartRoomType {
  id: number;
  typeName: string;
  basePrice: number;
  maxCapacity: number;
  availableRoomCount?: number;
  images?: { imageUrl: string }[];
}

export interface CartItem {
  roomType: CartRoomType;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number; // Tổng số lượng phòng trong giỏ
  totalAmount: number; // Tổng giá cơ bản, chưa nhân số đêm
  checkIn: Date | null;
  checkOut: Date | null;
  guests: number;
  setBookingDetails: (details: { checkIn: Date; checkOut: Date; guests: number }) => void;
  addToCart: (roomType: CartRoomType, quantity: number) => void;
  removeFromCart: (roomTypeId: number) => void;
  updateQuantity: (roomTypeId: number, quantity: number) => void;
  clearCart: () => void;
  syncInventory: (freshRooms: CartRoomType[]) => boolean;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => {
      const updateState = (newItems: CartItem[]) => {
        const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalAmount = newItems.reduce(
          (sum, item) => sum + item.roomType.basePrice * item.quantity,
          0
        );
        set({ items: newItems, totalItems, totalAmount });
      };

      return {
        items: [],
        totalItems: 0,
        totalAmount: 0,
        checkIn: null,
        checkOut: null,
        guests: 1,

        setBookingDetails: (details) => {
          set({
            checkIn: details.checkIn,
            checkOut: details.checkOut,
            guests: details.guests,
          });
        },

        addToCart: (roomType, quantity) => {
          const state = get();
          const existingItem = state.items.find((item) => item.roomType.id === roomType.id);
          const maxQuantity = roomType.availableRoomCount;

          if (maxQuantity !== undefined && maxQuantity <= 0) {
            toast.error(`Rất tiếc, ${roomType.typeName} đã hết phòng.`);
            return;
          }

          let newItems: CartItem[];

          if (existingItem) {
            const newQuantity = existingItem.quantity + quantity;
            if (maxQuantity !== undefined && newQuantity > maxQuantity) {
              toast.warning(`Chỉ còn ${maxQuantity} phòng trống cho ${roomType.typeName}.`);
              newItems = state.items.map((item) =>
                item.roomType.id === roomType.id ? { ...item, quantity: maxQuantity } : item
              );
            } else {
              newItems = state.items.map((item) =>
                item.roomType.id === roomType.id ? { ...item, quantity: newQuantity } : item
              );
            }
          } else {
            if (maxQuantity !== undefined && quantity > maxQuantity) {
               toast.warning(`Chỉ còn ${maxQuantity} phòng trống cho ${roomType.typeName}.`);
               newItems = [...state.items, { roomType, quantity: maxQuantity }];
            } else {
               newItems = [...state.items, { roomType, quantity }];
            }
          }
          updateState(newItems);
        },

        removeFromCart: (roomTypeId) => {
          const state = get();
          const newItems = state.items.filter((item) => item.roomType.id !== roomTypeId);
          updateState(newItems);
        },

        updateQuantity: (roomTypeId, quantity) => {
          const state = get();
          const itemToUpdate = state.items.find((item) => item.roomType.id === roomTypeId);
          
          if (!itemToUpdate) return;
          
          const maxQuantity = itemToUpdate.roomType.availableRoomCount;
          let newQuantity = quantity;

          if (maxQuantity !== undefined && quantity > maxQuantity) {
            toast.warning(`Chỉ còn ${maxQuantity} phòng trống cho ${itemToUpdate.roomType.typeName}.`);
            newQuantity = maxQuantity;
          }

          const newItems = state.items
            .map((item) => (item.roomType.id === roomTypeId ? { ...item, quantity: newQuantity } : item))
            .filter((item) => item.quantity > 0); // Tự động xóa nếu số lượng <= 0
            
          updateState(newItems);
        },

        clearCart: () =>
          set({
            items: [],
            totalItems: 0,
            totalAmount: 0,
            checkIn: null,
            checkOut: null,
            guests: 1,
          }),

        syncInventory: (freshRooms) => {
          let hasReduced = false; // Biến cờ báo hiệu xem có phòng nào bị ép giảm số lượng không

          set((state) => {
            let isStateChanged = false;

            // Bước 1 & 2 & 3: Duyệt và ép số lượng
            const newItems = state.items.map((item) => {
              const freshRoom = freshRooms.find((r) => r.id === item.roomType.id);
              const realAvailable = freshRoom?.availableRoomCount || 0;

              // Nếu số lượng trống mới khác số lượng trống cũ lưu trong giỏ
              // Hoặc số lượng khách đang chọn lớn hơn số lượng thực tế
              if (
                item.roomType.availableRoomCount !== realAvailable ||
                item.quantity > realAvailable
              ) {
                isStateChanged = true;
                
                if (item.quantity > realAvailable) {
                  hasReduced = true; // Đánh dấu là có phòng bị ép giảm để báo ra UI
                }

                return {
                  ...item,
                  roomType: { ...item.roomType, availableRoomCount: realAvailable },
                  quantity: Math.min(item.quantity, realAvailable), // Ép số lượng xuống
                };
              }
              return item; // Trả về y nguyên nếu không có gì đổi
            });

            // Nếu không có gì thay đổi, trả về state cũ để chống re-render
            if (!isStateChanged) return state;

            // Bước 4: Lọc bỏ những phòng hết sạch (quantity = 0)
            const validItems = newItems.filter((item) => item.quantity > 0);

            // Bước 5: TÍNH LẠI TỔNG TIỀN (Quan trọng nhất)
            // Lưu ý: Giá ở đây là basePrice. Tính toán số đêm (nights) thường được làm ở UI (CartPage).
            // Nếu store của bạn lưu totalAmount theo kiểu (basePrice * quantity), thì tính như sau:
            const newTotalAmount = validItems.reduce(
              (sum, item) => sum + item.roomType.basePrice * item.quantity,
              0
            );

            // Trả về State mới
            return {
              items: validItems,
              totalAmount: newTotalAmount,
            };
          });

          return hasReduced; // Trả về kết quả cho CartPage.tsx biết để gọi toast.error
        },
      };
    },
    {
      name: 'hotel-booking-cart', // Tên key trong localStorage
      storage: createJSONStorage(() => localStorage, {
        reviver: (key, value) => {
          if (key === 'checkIn' || key === 'checkOut') {
            if (typeof value === 'string') {
              const date = new Date(value);
              return isNaN(date.getTime()) ? null : date;
            }
          }
          return value;
        },
      }),
    }
  )
);
