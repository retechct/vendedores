import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface Context {
  params: { id: string }
}

export async function GET(request: Request, context: Context) {
  try {
    const { id } = context.params;
    const vendedor = await prisma.vendedor.findUnique({
      where: { id_ven: Number(id) },
      include: { distrito: true, especialidad: true },
    });
    if (!vendedor) {
      return NextResponse.json({ message: 'Vendedor no encontrado' }, { status: 404 });
    }
    return NextResponse.json(vendedor);
  } catch {
    return NextResponse.json({ message: 'Error al obtener vendedor' }, { status: 500 });
  }
}

export async function PUT(request: Request, context: Context) {
  try {
    const { id } = context.params;
    const data = await request.json();
    const vendedorActualizado = await prisma.vendedor.update({
      where: { id_ven: Number(id) },
      data: {
        nom_ven: data.nom_ven,
        ape_ven: data.ape_ven,
        cel_ven: data.cel_ven,
        id_distrito: Number(data.id_distrito),
        id_especialidad: Number(data.id_especialidad),
      },
    });
    return NextResponse.json(vendedorActualizado);
  } catch {
    return NextResponse.json({ message: 'Error al actualizar vendedor' }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: Context) {
  try {
    const { id } = context.params;
    const vendedorEliminado = await prisma.vendedor.delete({
      where: { id_ven: Number(id) },
    });
    return NextResponse.json(vendedorEliminado);
  } catch {
    return NextResponse.json({ message: 'Error al eliminar vendedor' }, { status: 500 });
  }
}
