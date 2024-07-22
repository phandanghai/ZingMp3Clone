import { useEffect, useState } from 'react';
import style from './Radio.module.scss';
import clsx from 'clsx';
import { ApiGetHome } from '../../redux/ApiMusic';
import Slider from 'react-slick';
function Radio() {
    const [radios, setRadios] = useState([]);
    useEffect(() => {
        ApiGetHome().then((data) => {
            console.log(data.data);
            setRadios(data.data.items[12]?.items);
        });
    }, []);

    const settings = {
        infinite: true,
        autoplay: false,
        autoplaySpeed: 2000,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        nextArrow: false,
        // nextArrow: <NextArrowButton />,
        // prevArrow: <PreviousArrowButton />,
    };
    console.log(radios);
    return (
        <div className={style['Radio']}>
            <h1>Radio</h1>
            <div className={style['listBox']}>
                <Slider {...settings} style={{ width: '100%' }}>
                    {radios?.map((remix) => {
                        return (
                            <div key={remix?.encodeId} className={style['image']}>
                                <img src={remix?.thumbnail} alt="" />
                                <h3>{`${remix.title.split([' '])[0]}`}</h3>
                                <p>{`${remix.activeUsers} người nghe`}</p>
                            </div>
                        );
                    })}
                </Slider>
            </div>
        </div>
    );
}

export default Radio;
