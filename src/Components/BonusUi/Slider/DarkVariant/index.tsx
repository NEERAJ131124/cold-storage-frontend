import React, { useState } from 'react'
import { Card, CardBody, Carousel, CarouselCaption, CarouselControl, CarouselIndicators, CarouselItem, Col } from 'reactstrap';
import { darkVariantData, darkVariantSubTitle } from '../../../../Data/BonusUi/Slider';
import { DefaultSliderItem } from '../../../../Types/BonusUi.type';
import CommonCardHeader from '../../../../Utils/CommonComponents/CommonCardHeader';
import { DarkVariantTitle } from '../../../../Utils/Constants';
import { Image } from '../../../../AbstractElements';
import { dynamicImage } from '../../../../Utils';

export default function DarkVariant() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === darkVariantData.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };
    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? darkVariantData.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };
    const goToIndex = (newIndex: number) => {
        if (animating) return;
        setActiveIndex(newIndex);
    };
    const slides = darkVariantData.map((item: DefaultSliderItem) => {
        return (
            <CarouselItem onExiting={() => setAnimating(true)} onExited={() => setAnimating(false)} key={item.id}>
                <Image src={dynamicImage(`slider/${item.image}`)} alt='drawing-room' className='d-block w-100' />
                <CarouselCaption className='d-none d-md-block carousel-opacity' captionText={item.captionText} captionHeader={item.captionHeader} />
            </CarouselItem>
        );
    });
    return (
        <Col xl={6} xs={12}>
            <Card>
                <CommonCardHeader headClass='pb-0' title={DarkVariantTitle} subTitle={darkVariantSubTitle} />
                <CardBody>
                    <Carousel dark={true} activeIndex={activeIndex} next={next} previous={previous}>
                        <CarouselIndicators items={darkVariantData} activeIndex={activeIndex} onClickHandler={goToIndex} />
                        {slides}
                        <CarouselControl direction='prev' directionText='Previous' onClickHandler={previous} />
                        <CarouselControl direction='next' directionText='Next' onClickHandler={next} />
                    </Carousel>
                </CardBody>
            </Card>
        </Col>
    );
}