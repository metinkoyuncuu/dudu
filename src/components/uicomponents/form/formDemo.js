import React from 'react'
import Form from './form'

function FormDemo() {
    return (
        <div className='w-80'>
            <Form 
                    title={'Bir Adet Panel Başlığı'} 
                    // backgroundImage={'https://m.media-amazon.com/images/I/11ru70B3RzL._AC_UF1000,1000_QL80_.jpg'} 
                    backgroundColor='blue'
                    >
                <label>
                    Bağlı Olduğu Şirket Müşteri No:
                    <input type="text" />
                </label>
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
        </div>
    )
}

export default FormDemo
