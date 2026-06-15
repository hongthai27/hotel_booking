import { Prisma, AuditAction } from '@prisma/client';

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

const serializeValue = (value?: object | null): string | null => {
  if (value === undefined || value === null) return null;
  return JSON.stringify(value);
};

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