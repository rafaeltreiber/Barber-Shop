import { db } from "@/app/_lib/prisma";
import BarbershopInfo from "./_components/barbershop-info";
import ServiceItem from "./_components/service-item";
import { getServerSession } from "next-auth";


interface BabershopDetailsPageProps {
  params: {
    id?: string
  }
}

const BabershopDetailsPage = async ({ params }: BabershopDetailsPageProps) => {
  const session = await getServerSession()

  if (!params.id) {
    // TODO: redirecionar para home page
    return null
  }
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id
    },
    include: {
      services: true
    }
  })

  if (!barbershop)
    // TODO: redirecionar para home page
    return null

  return (
    <div>
      <BarbershopInfo barbershop={barbershop} />

      <div className="px-5 flex flex-col gap-4 py-6">
        {barbershop.services.map(service => (
          <ServiceItem key={service.id} barbershop={barbershop} service={service} isAuthenticated={!!session?.user} />
        ))}
      </div>
    </div>

  );
}

export default BabershopDetailsPage;