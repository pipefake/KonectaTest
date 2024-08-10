import React, { Fragment, useState, useEffect } from 'react'
import fotoFelipeJimenez from '../multimedia/logoKonecta.png';




export default function Header(props) {


    return (
        <Fragment>
            <div className="header">
                <div>
                    <img className='' src={fotoFelipeJimenez} alt='foto de felipe jimenez' />
                    <p className='smallText poppins-regular'>
                        Lista de {props.text}
                    </p>

                </div>
            </div>
        </Fragment>

    )

}