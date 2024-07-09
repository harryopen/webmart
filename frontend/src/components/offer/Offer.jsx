
import exclusive_image from '../Assets/exclusive_image.png'

const Offer = () => {
  return (
    <div className='offers w-3/5 min-[60vh] px-0 py-36 m-auto flex items-center mt-[150px] bg-gradient-to-b from-cyan-100 to-blue-50 ' >
      <div className="offers-left  flex flex-1 flex-col justify-center">
        <h1 className='text-black text-2xl font-bold'>Exclusive</h1>
        <h1  className='text-black text-2xl font-bold'>Offers For You</h1>
        <p  className='text-black text-xl'>ONLY ON BEST SELLERS PRODUCTS</p>
        <button className='border-none w-32 h-5 rounded-sm bg-gray-600'>Check Now</button>
      </div>
      <div className="offers-right flex flex-1 item-center justify-end">
        <img src={exclusive_image} alt="" />
      </div>
    </div>
  )
}

export default Offer
