import { Prisma, AuditAction } from '@prisma/client';

// Kiểu dữ liệu cho transaction Prisma được truyền từ service
// Sử dụng Prisma.TransactionClient thay vì PrismaClient để đảm bảo
// audit log luôn nằm trong cùng 1 transaction với thao tác chính
type TransactionClient = Prisma.TransactionClient;

interface AuditLogParams {
  tx: TransactionClient;
  actorId: number;
  targetTable: string;
  targetId: number;
  action: AuditAction;
  oldValue?: object | null;
  newValue?: object | null;
}

// Serialize object thành JSON string, trả về null nếu giá trị không tồn tại
const serializeValue = (value?: object | null): string | null => {
  if (value === undefined || value === null) return null;
  return JSON.stringify(value);
};

// Ghi nhật ký thao tác vào bảng AUDIT_LOG trong cùng transaction
// Luôn truyền tx từ bên ngoài, không tự tạo transaction bên trong
export const createAuditLog = async ({
  tx,
  actorId,
  targetTable,
  targetId,
  action,
  oldValue,
  newValue,
}: AuditLogParams): Promise<void> => {
  await tx.auditLog.create({
    data: {
      actorId,
      targetTable,
      targetId,
      action,
      oldValue: serializeValue(oldValue),
      newValue: serializeValue(newValue),
    },
  });
};