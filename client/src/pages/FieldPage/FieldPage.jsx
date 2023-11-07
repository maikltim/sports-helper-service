import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "../../components/misc/Headings.js";
import { PrimaryButton } from "../../components/misc/Buttons";
import { ReactComponent as ChevronLeftIcon } from "feather-icons/dist/icons/chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "feather-icons/dist/icons/chevron-right.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "../../images/svg-decorator-blob-4.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "../../images/svg-decorator-blob-5.svg";
import "slick-carousel/slick/slick.css";
import { useParams } from "react-router";
import { fetchGetFieldEvents } from '../../store/ducks/events/asyncFunction';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import AddEventModal from '../../components/AddEventModal/AddEventModal';

import Timeline from '../../components/Timeline/Timeline';
import {getFieldAC} from '../../store/ducks/fields/actionCreator'
import { setDateAC } from '../../store/ducks/date/actionCreator'
import { getDayEventsAC, getDayAvailTimesAC } from '../../store/ducks/events/actionCreators';
import { useDispatch, useSelector } from "react-redux";

const Container = tw.div`relative `;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;
const TestimonialsContainer = tw.div`mt-16 lg:mt-0`;
const Testimonials = styled.div``;
const Testimonial = tw.div`max-w-md lg:max-w-none mx-auto lg:mx-0 flex flex-col items-center lg:items-stretch lg:flex-row`;

const TestimonialImageSlider = tw(Slider)`w-full lg:w-5/12 flex-shrink-0 `;

const ImageAndControlContainer = tw.div`relative outline-none`;
const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded bg-cover bg-center h-80 sm:h-96 lg:h-144`
]);

const ControlContainer = tw.div`absolute bottom-0 right-0 bg-gray-100 px-6 py-4 rounded-tl-3xl border`;
const ControlButton = styled(PrimaryButton)`
  ${tw`mx-3 rounded-full text-gray-100 p-2`}
  svg {
    ${tw`w-5 h-5`}
  }
`;

const TextContainer = styled.div(props => [
  tw`flex flex-col w-full lg:w-7/12`,
  props.textOnLeft ? tw`lg:pr-12 lg:order-first` : tw`lg:pl-12 lg:order-last`
]);

const Subheading = tw(SubheadingBase)`mb-4`;
const HeadingTitle = tw(SectionHeading)`lg:text-left leading-tight`;
const Description = tw.p`max-w-md text-center mx-auto lg:mx-0 lg:text-left lg:max-w-none leading-relaxed text-sm sm:text-base lg:text-lg font-medium mt-4 text-secondary-100`;

const DecoratorBlob1 = tw(
  SvgDecoratorBlob1
)`absolute w-32 top-0 left-0 -z-10 text-primary-500 opacity-25 transform -translate-x-full`;
const DecoratorBlob2 = tw(
  SvgDecoratorBlob2
)`absolute w-32 bottom-0 right-0 -z-10 text-pink-500 opacity-15 transform translate-x-2/3 translate-y-8`;

export default function FieldPage() {

  const { currentField } = useSelector(state => state.field);


  let subheading = "Адрес";
  let heading = "Название"; // .name
  let description = "ИНФОРМАЦИЯ. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  let testimonials = currentField.pictures;
  let textOnLeft = false;
  /*
   * You can modify the testimonials shown by modifying the array below or passing in the testimonials prop above
   * You can add or remove objects from the array as you need.
   */
  const defaultTestimonials = [
    {
      imageSrc:
        '',
    },
    {
      imageSrc:
        '',
    }
  ];

  if (!testimonials || testimonials.length === 0) testimonials = defaultTestimonials;

  // useState is used instead of useRef below because we want to re-render when sliderRef becomes available (not null)
  const [imageSliderRef, setImageSliderRef] = useState(null);
  const [textSliderRef, setTextSliderRef] = useState(null);


  const dispatch = useDispatch();
  const { id } = useParams();

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    dispatch(fetchGetFieldEvents(id));
    setTimeout(() => {
      dispatch(getFieldAC(id));
      dispatch(getDayEventsAC(`${date.getDate()}.${Number(date.getMonth()) + 1}.${date.getFullYear()}`));
      dispatch(getDayAvailTimesAC());
    }, 500);
  }, [dispatch]);

  const changeDate = (date) => {
    setDate(date);
    dispatch(setDateAC(`${date.getDate()}.${Number(date.getMonth()) + 1}.${date.getFullYear()}`));
    dispatch(getDayEventsAC(`${date.getDate()}.${Number(date.getMonth()) + 1}.${date.getFullYear()}`));
    dispatch(getDayAvailTimesAC());
  };
  return (
    <Container>
      <Content>
        <HeadingInfo tw="text-center lg:hidden" subheading={subheading} heading={heading} description={description} />
        <TestimonialsContainer>
          <Testimonials>
            <Testimonial>
              <TestimonialImageSlider arrows={false} ref={setImageSliderRef} asNavFor={textSliderRef} fade={true}>
                {testimonials.map((testimonial, index) => (
                  <ImageAndControlContainer key={index}>
                    <Image imageSrc={testimonial} />
                    <ControlContainer>
                      <ControlButton onClick={imageSliderRef?.slickPrev}>
                        <ChevronLeftIcon />
                      </ControlButton>
                      <ControlButton onClick={imageSliderRef?.slickNext}>
                        <ChevronRightIcon />
                      </ControlButton>
                    </ControlContainer>
                  </ImageAndControlContainer>
                ))}
              </TestimonialImageSlider>
              <TextContainer textOnLeft={textOnLeft}>
                <HeadingInfo tw="hidden lg:block" subheading={currentField.address} heading={currentField.title} description={currentField.content} />

                <div>
                  <Calendar
                    onChange={changeDate}
                    value={date}
                    minDate={new Date()}
                  />
                </div>

                <div style={{ marginTop: '30px' }}>
                  <AddEventModal />
                </div>

              </TextContainer>
            </Testimonial>
          </Testimonials>
        </TestimonialsContainer>
      </Content>
      <DecoratorBlob1 />
      <DecoratorBlob2 />

      <div>
        <Timeline />
      </div>

    </Container>
  );
};

const HeadingInfo = ({ subheading, heading, description, ...props }) => (
  <div {...props}>
    {subheading ? <Subheading>{subheading}</Subheading> : null}
    <HeadingTitle>{heading}</HeadingTitle>
    <Description>{description}</Description>
  </div>
);
