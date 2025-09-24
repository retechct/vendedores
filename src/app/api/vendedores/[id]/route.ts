import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET (por ID): Para obtener un solo vendedor
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const vendedor = await prisma.vendedor.findUnique({
      where: { id_ven: Number(params.id) },
      include: {
        distrito: true,
        especialidad: true,
      },
    });

    if (!vendedor) {
      return NextResponse.json({ message: 'Vendedor no encontrado' }, { status: 404 });
    }
    return NextResponse.json(vendedor);
  } catch (error) {
    console.error(error); // Es bueno ver el error real en los logs
    return NextResponse.json({ message: 'Error al obtener vendedor' }, { status: 500 });
  }
}

// PUT: Para actualizar un vendedor
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const vendedorActualizado = await prisma.vendedor.update({
      where: { id_ven: Number(params.id) },
      data: {
        nom_ven: data.nom_ven,
        ape_ven: data.ape_ven,
        cel_ven: data.cel_ven,
        id_distrito: Number(data.id_distrito),
        id_especialidad: Number(data.id_especialidad),
      },
    });
    return NextResponse.json(vendedorActualizado);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error al actualizar vendedor' }, { status: 500 });
  }
}

// DELETE: Para eliminar un vendedor
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const vendedorEliminado = await prisma.vendedor.delete({
      where: { id_ven: Number(params.id) },
    });
    return NextResponse.json(vendedorEliminado);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error al eliminar vendedor' }, { status: 500 });
  }
}