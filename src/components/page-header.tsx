import Image from "next/image"

interface PageHeaderProps {
  title: string
  description: string
  backgroundImage: string
  className?: string
}

export default function PageHeader({ title, description, backgroundImage, className = "" }: PageHeaderProps) {
  return (
    <section className={`relative py-20 overflow-hidden ${className}`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image src={backgroundImage || "/logo.jpg"} alt={title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/80 to-teal-600/80" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
          <p className="text-xl text-orange-100">{description}</p>
        </div>
      </div>
    </section>
  )
}
