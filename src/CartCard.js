

export default function CartCard(props) {

     

    function addTotal(){
       var x =  props.cart.reduce((t, p)=>{
           return t + (p.price * p.count)
        }, 0)
        return x.toFixed(2)
    }
  return (
    <div className='border border-2 border-info p-2'>
        CartCard
       {props.cart.map((p)=>{
        return <li className="cartcard">
             <div className="w-25"> {p.title}</div>
             <div className="w-25"> {p.count}</div>
             <div className="w-25">{p.count *p.price}</div>
                 
                
           </li> 
       })}
       <hr/>
        <div className="text-end">
          <h1> total :{addTotal()}</h1>
        </div>
   </div>
  )
}
