import { Request, Response } from 'express';
import { prisma } from '../utils/prisma.util';
import { successResponse } from '../utils/response.util';
import { catchAsync } from '../utils/catch-async.util';

export const searchUsers = catchAsync(async (req: Request, res: Response) => {
  const { keyword } = req.query;

  const users = await prisma.user.findMany({
    where: {
      role: 'customer', 
      OR: [
        { fullName: { contains: String(keyword) } },
        { email: { contains: String(keyword) } },
        { phoneNumber: { contains: String(keyword) } },
      ],
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      phoneNumber: true,
    },
    take: 10, 
  });

  successResponse(res, users, 'Tìm kiếm khách hàng thành công');
});
