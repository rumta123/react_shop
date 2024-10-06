import React from 'react'
import Map from './Map/Map'
import ContactInfo from './ContactInfo/ContactInfo'
import insta from '../../img/ic-instagram.png'
import wt from '../../img/ic-whatsapp.png'
export default function Footer() {
  const contactInfoData = [
    { label: "Phone", description: "+7 (499) 350-66-04" },
    { label: "Socials", icons: [{ src: insta, link: "https://www.instagram.com/" }, { src: wt, link: "https://web.whatsapp.com/" }] },  
    { label: "Address", description: "Dubininskaya Ulitsa, 96, Moscow, Russia, 115093" },
    { label: "Working Hours", description: "24 hours a day" },
    // Дополнительные данные о контактах, если необходимо
  ];
  return (
    <footer>
      <h2 className=''>Contact</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 16, borderRadius: 12, marginTop:32, marginBottom:32 }}>
        {contactInfoData.map((info, index) => (
       
          <ContactInfo key={index} label={info.label} Description={info.description}  icons={info.icons} />
        ))}
      </div>
        <Map/>
    </footer>
  )
}
