import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const token = await getToken({ req  });
 

  if (!token || !token.token) {
    return NextResponse.json({ message: 'Token not provided ' }, { status: 401 });
  }


  console.log(token?.token)

  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/subjects`, {
    headers: {
      token: `${token?.token}`,
    },
  });

  const payload = await response.json();
  return NextResponse.json(payload);
}
