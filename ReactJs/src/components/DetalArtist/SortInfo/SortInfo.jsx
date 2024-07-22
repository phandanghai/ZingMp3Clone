import { useEffect } from 'react';
import style from './SortInfo.module.scss';
import clsx from 'clsx';
import { FaPlay } from 'react-icons/fa';
import { AiOutlineUserAdd } from 'react-icons/ai';
function SortInfo(props) {
    return (
        <div className={style['SortInfo']}>
            <img src={props.artist.thumbnail} alt="" />
            <div className={style['info']}>
                <div className={style['info-1']}>
                    <h1>{props.artist.name}</h1>
                    <div className={style['playIcon']}>
                        <FaPlay className={style['icon']} />
                    </div>
                </div>

                <div className={style['info-2']}>
                    <h4 className={style['interest']}>{`${Math.floor(props.artist.follow / 1000)}.${Math.floor(
                        props.artist.follow % 1000,
                    )} người quan tâm`}</h4>
                    <button>
                        <AiOutlineUserAdd className={style['icon']} />
                        <h5>Quan tâm</h5>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SortInfo;
