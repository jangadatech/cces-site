import { connectToDatabase } from '@/config/mongo';
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const db = await connectToDatabase();
  const collection = db.collection('objects');

  try {
    // Obtendo o parâmetro de query 'filterDate' da URL, se houver
    const params = request.nextUrl.searchParams;
    const filterDate = params.get('date');

    let query = {};
    
    if (filterDate) {
      query = {
        datetime_input: { $lte: new Date(filterDate) }
      };
    } else {
      const currentDate = new Date();
      const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
      const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);

      query = {
        datetime_input: { $gte: startOfDay, $lt: endOfDay }
      };
    }

    // Buscando os objetos no banco de dados de acordo com a query
    const data = await collection.find(query).toArray();

    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  
  const db = await connectToDatabase();
  const collection = db.collection('input_outputs');

  try {
    const data = await request.json();

    const requiredKeys = [
      "driver",
      "datetime_input",
      "datetime_output",
      "odometer",
      "prefix",
      "description",
      "destiny",
      "status"
    ];

    for (const key of requiredKeys) {
      if (!data.hasOwnProperty(key)) {
        return new Response(`Objeto inválido. A chave "${key}" é obrigatória.`, { status: 400 });
      }
    }

    // Adicionando o objeto ao banco de dados
    const result = await collection.insertOne({
      driver: data.driver,
      datetime_input: data.datetime_input,
      datetime_output: data.datetime_output,
      odometer: data.odometer,
      prefix: data.prefix,
      description: data.description,
      destiny: data.destiny,
      odometer_before: null,
      travelled_distance: null,
      status: data.status,
      created_at: new Date(),
      updated_at: null,
    });

    return NextResponse.json({ result })
  } catch (error) {
    return error
  }
}
