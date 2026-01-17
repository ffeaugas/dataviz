import { createFileRoute } from '@tanstack/react-router'
import { getTheaters } from '@/data/theaters'
import TheaterMap from '@/components/TheaterMap'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/visualization/theaters')({
  component: RouteComponent,
  loader: async () => await getTheaters(),
})

function RouteComponent() {
  const theaters = Route.useLoaderData()

  if (!theaters) {
    return <div>No theaters found</div>
  }

  return (
    <div className="h-[calc(100vh-var(--navbar-height))] flex flex-row">
      <div className="relative flex-3">
        <TheaterMap theaters={theaters} />
        <MapModeSelect />
      </div>
      <div className="flex-1 bg-secondary">
        <Button>Show graph</Button>
      </div>
    </div>
  )
}

const MapModeSelect = () => {
  return (
    <div className="absolute z-1000 top-6 right-6 bg-background/90 backdrop-blur-sm rounded-lg shadow-lg p-4 border w-[220px]">
      <NativeSelect className="w-full">
        <NativeSelectOption value="">Theater list</NativeSelectOption>
        <NativeSelectOption value="apple">Theaters per habitant</NativeSelectOption>
      </NativeSelect>
    </div>
  )
}