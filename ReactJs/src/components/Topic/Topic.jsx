import { useEffect } from 'react';
import style from './Topic.module.scss';
import clsx from 'clsx';
import { ApiGetHome } from '../../redux/ApiMusic';

function Topic() {
    const OutStandings = [
        {
            title: 'BXH Nhạc Mới',
            img: 'https://photo-zmp3.zmdcdn.me/cover/d/b/e/4/dbe426a555b7d680be25232007739019.jpg',
        },
        {
            title: 'Top 100',
            img: 'https://photo-zmp3.zmdcdn.me/cover/2/d/2/d/2d2d88326a507319335ffc2e2887c0b7.jpg',
        },
        {
            title: `Artist's Story`,
            img: 'https://photo-zmp3.zmdcdn.me/cover/a/c/9/e/ac9e073bbfbaadea7b1cb50bd047ece0.jpg',
        },
        {
            title: 'Nhạc Trẻ',
            img: 'https://photo-zmp3.zmdcdn.me/cover/6/6/3/5/6635bad85a570ca140e207910b5d44f1.jpg',
        },
    ];

    const Countries = [
        {
            title: 'Nhạc Việt',
            img: 'https://photo-zmp3.zmdcdn.me/cover/9/5/8/e/958e9994c6720513cc84a7f7a478020b.jpg',
        },
        {
            title: 'Nhạc Âu Mỹ',
            img: 'https://photo-zmp3.zmdcdn.me/cover/d/6/4/0/d640e486023bb0bc1bbe4d94209ff648.jpg',
        },
        {
            title: 'Nhạc Hàn',
            img: 'https://photo-zmp3.zmdcdn.me/cover/9/0/c/6/90c615657364a570232d7f6e86ffa6da.jpg',
        },
        {
            title: 'Nhạc Hoa',
            img: 'https://photo-zmp3.zmdcdn.me/cover/0/6/e/0/06e09e84d6c6ef29f588e0c6032d72bf.jpg',
        },
    ];

    useEffect(() => {
        ApiGetHome().then((data) => {
            console.log(data);
        });
    }, []);
    return (
        <div className={style['Topic']}>
            <img
                src="https://photo-zmp3.zmdcdn.me/cover/3/f/4/1/3f41f32d1ca9baeb2206137e5f2eab5c.jpg"
                alt=""
            />
            <div className={style['outstanding']}>
                <h2>Nổi Bật</h2>
                <div className={style['listBox']}>
                    {OutStandings.map((item) => {
                        return (
                            <div key={item.title} className={style['item']}>
                                <img src={item.img} alt="" />
                                <div>
                                    <h4>{item.title}</h4>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className={style['countries']}>
                <h2>Quốc Gia</h2>
                <div className={style['listBox']}>
                    {Countries.map((item) => {
                        return (
                            <div key={item.title} className={style['item']}>
                                <img src={item.img} alt="" />
                                <div>
                                    <h4>{item.title}</h4>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Topic;
