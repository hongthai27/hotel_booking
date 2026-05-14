import { Prisma, AuditAction } from '@prisma/client';

// Kieu du lieu cho transaction Prisma duoc truyen tu service
// Su dung Prisma.TransactionClient thay vi PrismaClient de dam bao
// audit log luon nam trong cung 1 transaction voi thao tac chinh
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

// Serialize object thanh JSON string, tra ve null neu gia tri khong ton tai
const serializeValue = (value?: object | null): string | null => {
  if (value === undefined || value === null) return null;
  return JSON.stringify(value);
};

// Ghi nhat ky thao tac vao bang AUDIT_LOG trong cung transaction
// Luon truyen tx tu ben ngoai, khong tu tao transaction ben trong
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