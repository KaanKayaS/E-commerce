import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import Header from './components/Header'
import Loading from './components/Loading'
import RouterConfig from './config/RouterConfig'
import PageContainer from './container/PageContainer'
import Drawer from '@mui/material/Drawer';
import { calculateBasket, deletefromBasket, setDrawer } from './redux/slices/basketSlice'
import { useEffect } from 'react'


function App() {

  const { products, drawer, totalAmount } = useSelector((store) => store.basket);
  const dispatch = useDispatch();

  const deleteBasket = (id) => {
    const payload = {
      id
    }

    dispatch(deletefromBasket(payload))
    dispatch(calculateBasket());
  }

  useEffect(() => {
    dispatch(calculateBasket())
  }, [])

  return (
    <div>
      <PageContainer>
        <Header />
        <RouterConfig />
        <Loading />
        <Drawer className='drawer' anchor='right' open={drawer} onClose={() => dispatch(setDrawer())}>
          {
            products && products.map((product) => {
              return (
                <div key={product.id}>
                  <div className='flex-row' style={{ padding: '20px' }}>
                    <img style={{ marginRight: '5px' }} src={product.image} width={50} height={50} />
                    <p style={{ width: '350px' }}>{product.title}({product.count})</p>
                    <p style={{ fontWeight: 'bold', marginRight: '10px' }}>{product.price} TL</p>
                    <button onClick={() => deleteBasket(product.id)} style={{ padding: '5px', borderRadius: '5px', backgroundColor: 'red', border: 'none', width: '35px', color: 'whitesmoke' }}>Sil</button>
                  </div>
                </div>

              )
            })
          }
          <div>
            <h2 style={{ textAlign: 'center' }}>{totalAmount} TL</h2>
          </div>
        </Drawer>
      </PageContainer>
    </div>
  )
}

export default App
