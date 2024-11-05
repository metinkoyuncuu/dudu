import React from 'react'
import Form from './form'

function FormDemo() {
    return (
      
            <Form 
                    title={'Bir Adet Panel Başlığı'} 
                    // backgroundImage={'https://m.media-amazon.com/images/I/11ru70B3RzL._AC_UF1000,1000_QL80_.jpg'} 
                    backgroundColor='blue'
                    width={'100'}
                    overlayOpacity={0.2}
                    
                    >
                <div className='d-block w-10 fs-2 h-auto'>
                    Bağlı Olduğu Şirket Müşteri No:
                    <input type="text" />
                </div>
                <label>
                    Çalışan Adı:
                    <input type="text" />
                </label>
                <label>
                    Şirket Adı:
                    <input type="text" />
                </label>
                <button>Arama</button>
                <button>Temizle</button>
            </Form>
   
    )
}

export default FormDemo
