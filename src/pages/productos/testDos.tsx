import Image from 'next/image'

const items = [
  {
    id: 1,
    title: 'Not ice cream',
    info: '200ml',
    finalPrice: '200,00',
    regularPrice: '',
    nomeda: 'ARS',
    image: {
      src: '/assets/images/image-3.png',
      alt: 'not ice cream'
    }
  },
  {
    id: 2,
    title: 'Mini postre Balcarse',
    info: '200ml',
    finalPrice: '200,00',
    regularPrice: '',
    nomeda: 'ARS',
    image: {
      src: '/assets/images/image-2.png',
      alt: 'Mini postre Balcarse'
    }
  },
  {
    id: 3,
    title: 'Powerade mountain Blast 20fl. oz',
    info: 'Sports Drinks',
    finalPrice: '170,00',
    regularPrice: '200,00',
    nomeda: 'ARS',
    image: {
      src: '/assets/images/image-1.png',
      alt: 'Powerade mountain'
    }
  }
]

const GridProducts = () => {
  return (
      <main className="container-productos grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map(item => (
          <div key={item.id} className="item-wrapper justify-center content-center bg-white rounded-lg shadow-md overflow-hidden">
            <div className="my-2.5 ml-18 mr-18 relative">
              <Image src={item.image.src} alt={item.image.alt} width={80} height={80} layout="responsive" />
            </div>
            <div className="p-3 px-6 leading-6 text-center">
              <h2 className="text-4xl text-gray-600 leading-8">{item.title}</h2>
              <p className="text-2xl text-gray-400">{item.info}</p>
            </div>
            <div className="text-center items-center flex flex-col justify-between">
            {item.regularPrice && (
              <div className="text-red-600 text-md mt-4 line-through">{`${item.regularPrice}`}<span className="text-sm line-through">{`${item.nomeda}`}</span></div>)}
            
            <div className="flex-grow flex flex-col justify-end price-bottom">
              <div className="text-violet-900 font-bold text-5xl pb-2.5">{`${item.finalPrice}`}<span className="text-2xl">{`${item.nomeda}`}</span></div>
            </div>
            </div>
          </div>
        ))}
      </main>
  )
}

export default GridProducts;