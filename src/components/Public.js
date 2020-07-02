import React from "react";
import { Link } from 'react-router-dom';
import '../styles/trails.scss';


const Public = () => {
    return (
        <div className="trails-container">
            <div className="trails-header">
                <p className="tr-header-title">
                    Маршрути
                </p>
            </div>
            <div className="trails-wrapper">
                <div className="hiking-side">
                    <div className="hiking-wrapper">
                        <p className="tr-title">
                            Піші маршрути
                        </p>
                        <p className="tr-text">
                            Походи у гори – чудовий спосіб тримати себе в формі та потужний антидепресант.
                            Починати ходити можна у будь-якій фізичній формі, в будь-який момент – навіть сьогодні.
                            Ще одна позитивна риса цього виду активного відпочинку – пішохідний спорт не вимагає суттєвих
                            фінансових вкладень, особливо в літню пору.
                        </p>
                        <Link to='/trails-list/hiking'>Go to</Link>
                    </div>
                </div>
                <div className="bike-side">
                    <div className="bike-wrapper">
                        <p className="tr-title">
                            Велосипедні маршрути
                        </p>
                        <p className="tr-text">
                            Активний відпочинок є специфічним. І це має розуміти кожен учасник атракції. Для безпечного
                            та
                            приємного відпочинку потрібно дотримуватись правил безпеки під час групових та
                            індивідуальних
                            туристичних піших походів. Кожен з учасників має чітко розуміти куди іде, навіщо (ціль та
                            мета)
                            та які фізичні даним володіє.
                        </p>
                        <Link to='/trails-list/bike'>Go to</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Public;