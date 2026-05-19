import { useMutation, useQueryClient } from '@tanstack/react-query'
import { adminService } from '../../services/adminService'
import toast from 'react-hot-toast'

const invalidate = (queryClient: any) =>
  queryClient.invalidateQueries({
    queryKey: ['admin', 'room-types'],
  })

export const useCreateRoomType = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: FormData) =>
      adminService.createRoomType(data),

    onSuccess: () => {
      invalidate(queryClient)
      toast.success('Tạo hạng phòng thành công')
    },

    onError: (e: any) =>
      toast.error(
        e.response?.data?.message ?? 'Tạo thất bại'
      ),
  })
}

export const useUpdateRoomType = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number
      data: FormData
    }) =>
      adminService.updateRoomType(id, data),

    onSuccess: () => {
      invalidate(queryClient)
      toast.success('Cập nhật hạng phòng thành công')
    },

    onError: (e: any) =>
      toast.error(
        e.response?.data?.message ?? 'Cập nhật thất bại'
      ),
  })
}

export const useDeleteRoomType = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) =>
      adminService.deleteRoomType(id),

    onSuccess: () => {
      invalidate(queryClient)
      toast.success('Đã xóa hạng phòng')
    },

    onError: (e: any) =>
      toast.error(
        e.response?.data?.message ?? 'Xóa thất bại'
      ),
  })
}

export const useUpdateRoomStatus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: number
      status: string
    }) =>
      adminService.updateRoomStatus(id, status),

    onSuccess: () => {
      invalidate(queryClient)
      toast.success(
        'Cập nhật trạng thái phòng thành công'
      )
    },

    onError: (e: any) => {
      if (e.response?.status === 409) {
        toast.error('Dữ liệu vừa bị thay đổi bởi người khác. Đang tải lại...');
        invalidate(queryClient); 
      } else {
        toast.error(e.response?.data?.message ?? 'Cập nhật thất bại');
      }
    },
  })
}