
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';
import { menuStructure, MenuItem } from '@/utilities/navigation';
import getUser from '@/utilities/user';

function filterMenuByRole(menu: MenuItem[], userRole: string): MenuItem[] {
  return menu
    .filter(item => {
      if (!item.roles) return true;
      return item.roles.includes(userRole);
    })
    .map(item => {
      if (item.children?.length) {
        const filteredChildren = item.children.filter(child => {
          if (!child.roles) return true;
          return child.roles.includes(userRole);
        });
        return {
          ...item,
          children: filteredChildren
        };
      }
      return item;
    });
}



export async function GET(request: NextRequest) {
  const user = await getUser();
  if (user) {
    const menu = filterMenuByRole(menuStructure, user?.role.toString() || '')
    return Response.json(menu, {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } else {
    return Response.json('User not authorized', {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}