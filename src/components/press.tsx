import SubHeadline from "./subheadline";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import styles from "./press.module.css";
import { useEffect } from "react";

import AnimationWrapper from "./animation-wrapper";

function PressOption({
  children,
  onButtonInteraction,
  btnRef,
}: {
  children?: React.ReactNode;
  onButtonInteraction: () => void;
  btnRef: (el: HTMLButtonElement | null) => void;
}) {
  return (
    <button
      className={`${styles["press-button"]} px-2 py-3`}
      onClick={onButtonInteraction}
      onMouseEnter={onButtonInteraction}
      ref={btnRef}
    >
      {children}
      <div className={styles["edge-border"]}></div>
      <div className={styles["edge-border"]}></div>
      <div className={styles["edge-border"]}></div>
      <div className={styles["edge-border"]}></div>
    </button>
  );
}

type TestimonialProps = {
  textLeft: string;
  textMain: string;
  textRight: string;
  author: string;
  role: string;
  refSetter: (el: HTMLLIElement | null) => void;
};

export const Testimonial = ({
  textLeft,
  textMain,
  textRight,
  author,
  role,
  refSetter,
}: TestimonialProps) => {
  return (
    <li ref={refSetter} className="hidden">
      <p className="h-65 min-[426px]:text-3xl text-2xl font-light mb-6 min-[426px]:mb-12 text-justify indent-10">
        <span className={styles["masked-text--left"]}>{textLeft}</span>
        <span className={styles["main-text"]}>{textMain}</span>
        <span className={styles["masked-text--right"]}>{textRight}</span>
      </p>
      <p className="text-2xl font-light mb-1">{author}</p>
      <p className="text-lg font-extralight text-(--grey)">{role}</p>
    </li>
  );
};

const testimonials = [
  {
    textLeft: "industry media call it ",
    textMain:
      "a platform that turns influencer marketing from guesswork into a structured growth channel",
    textRight: ", helping brands find creators who actually fit...",
    author: "Clara Bennett",
    role: "Brand Strategy Editor, BBC",
    svg: (
      <svg
        width="560"
        height="160"
        viewBox="0 0 560 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_633_111)">
          <path
            d="M45 35H78.8C88.75 35 96.5 36.99 101.9 40.98C107.36 44.97 110.1 50.69 110.1 58.18C110.1 62.46 109.121 66.17 107.16 69.28C105.2 72.43 102.31 74.92 98.47 76.77C103.77 78.53 107.83 81.32 110.67 85.14C113.49 88.96 114.89 93.6 114.89 99.04C114.89 104.41 113.52 109.03 110.79 112.84C108.06 116.7 104.16 119.68 99.09 121.78C94.03 123.88 87.99 124.93 80.89 124.93H44.99L45 35ZM0 160H160V0H0V160ZM77.1 50C86.81 50 91.7 53.57 91.7 60.7C91.7 64.39 90.46 67.27 87.97 69.32C85.48 71.38 81.87 72.4 77.17 72.4H63.37V50H77.1ZM79.42 86.5H63.22V110.8H79.12C84.58 110.8 88.79 109.77 91.72 107.72C94.66 105.66 96.13 102.71 96.13 98.85C96.13 90.63 90.54 86.55 79.33 86.55L79.42 86.5Z"
            fill="currentColor"
          />
          <path
            d="M245 35H278.8C288.75 35 296.5 36.99 301.9 40.98C307.36 44.97 310.1 50.69 310.1 58.18C310.1 62.46 309.121 66.17 307.16 69.28C305.2 72.43 302.3 74.92 298.47 76.77C303.77 78.53 307.83 81.32 310.67 85.14C313.49 88.96 314.89 93.6 314.89 99.04C314.89 104.41 313.52 109.03 310.79 112.84C308.06 116.7 304.16 119.68 299.09 121.78C294.03 123.88 287.99 124.93 280.89 124.93H244.99L245 35ZM200 160H360V0H200V160ZM277.1 50C286.81 50 291.7 53.57 291.7 60.7C291.7 64.39 290.46 67.27 287.97 69.32C285.48 71.38 281.87 72.4 277.17 72.4H263.37V50H277.1ZM279.42 86.5H263.22V110.8H279.12C284.58 110.8 288.79 109.77 291.72 107.72C294.66 105.66 296.13 102.71 296.13 98.85C296.13 90.63 290.54 86.55 279.33 86.55L279.42 86.5Z"
            fill="currentColor"
          />
          <path
            d="M502 124C506.91 122.81 511.23 121.18 515 119.13V102.03C507.13 106.88 498.5 109.31 489.2 109.31C483.1 109.31 477.9 108.16 473.6 105.86C469.32 103.56 466.06 100.21 463.82 95.76C461.57 91.36 460.45 86.03 460.45 79.76C460.45 73.51 461.61 68.16 463.94 63.86C466.27 59.5 469.61 56.17 473.94 53.87C478.3 51.57 483.57 50.42 489.74 50.42C494.23 50.42 498.51 51.018 502.54 52.21C506.6 53.4 510.37 55.1501 513.84 57.4501V39.9501C510.03 37.9801 505.9 36.4801 501.44 35.4501C496.99 34.4201 492.27 33.91 487.24 33.91C480.04 33.91 473.54 34.98 467.74 37.12C461.94 39.26 456.94 42.34 452.84 46.37C448.69 50.4 445.51 55.23 443.31 60.87C441.11 66.5 440.01 72.77 440.01 79.77C440.01 86.93 441.07 93.37 443.19 99.07C445.31 104.79 448.35 109.57 452.34 113.57C456.32 117.52 461.19 120.54 466.94 122.64C472.7 124.74 479.14 125.79 486.34 125.79C491.76 125.79 496.94 125.192 501.84 124H502ZM560 159.8H400V-0.199951H560V159.8Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_633_111">
            <rect width="560" height="160" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    textLeft: "the feature that stands out is ",
    textMain:
      "M.Labs gives brands a faster way to turn creator selection into campaign performance",
    textRight:
      ", bringing strategy, matching, and forecasting into one workflow...",
    author: "Nora Whitfield",
    role: "Marketing Technology Editor, Bloomberg",
    svg: (
      <svg
        width="164"
        height="33"
        viewBox="0 0 164 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_1_1734)">
          <path
            d="M4.30793 4.14385H7.86469C11.1154 4.14385 12.5479 5.14252 12.5479 7.17115C12.5479 8.93407 11.1154 10.1311 8.24 10.1311H4.30793V4.14385ZM0 24.0907H8.71732C13.2986 24.0907 17.8798 22.4997 17.8798 17.378C17.8798 14.3507 15.6966 12.0266 12.6543 11.6904V11.6204C15.1435 10.8953 16.8602 9.13296 16.8602 6.47266C16.8602 2.1831 13.0945 0.55542 9.43577 0.55542H0V24.0907ZM4.30793 13.7195H8.44402C11.931 13.7195 13.5779 14.5851 13.5779 17.047C13.5779 20.1342 10.4935 20.5023 8.27218 20.5023H4.30793V13.7195Z"
            fill="currentColor"
          />
          <path
            d="M22.7513 24.0906V0"
            stroke="currentColor"
            strokeWidth="3.97771"
            strokeMiterlimit="10"
          />
          <path
            d="M31.6458 16.1135C31.6458 13.6203 33.4591 11.3286 36.4687 11.3286C39.4783 11.3286 41.2862 13.6208 41.2862 16.1135C41.2862 18.6062 39.4783 20.899 36.4687 20.899C33.4586 20.899 31.6458 18.6067 31.6458 16.1135ZM27.5419 16.1135C27.5419 21.1334 31.5062 24.4874 36.4687 24.4874C41.4253 24.4874 45.3955 21.1339 45.3955 16.1135C45.3955 11.0931 41.4258 7.73486 36.4687 7.73486C31.5062 7.73433 27.5419 11.0936 27.5419 16.1135Z"
            fill="currentColor"
          />
          <path
            d="M51.3499 16.1135C51.3499 13.6203 53.1632 11.3286 56.1728 11.3286C59.1824 11.3286 60.9902 13.6208 60.9902 16.1135C60.9902 18.6062 59.1824 20.899 56.1728 20.899C53.1632 20.899 51.3499 18.6067 51.3499 16.1135ZM47.246 16.1135C47.246 21.1334 51.2108 24.4874 56.1728 24.4874C61.1293 24.4874 65.0996 21.1339 65.0996 16.1135C65.0996 11.0931 61.1299 7.73486 56.1728 7.73486C51.2102 7.73433 47.246 11.0936 47.246 16.1135Z"
            fill="currentColor"
          />
          <path
            d="M67.5991 8.13366H71.4989V10.6295H71.5633C72.2823 9.13286 73.8539 7.73218 76.5897 7.73218C79.122 7.73218 80.8709 8.69425 81.7235 10.6921C82.9198 8.66827 84.6633 7.73218 87.1203 7.73218C91.4975 7.73218 93.038 10.7621 93.038 14.5855V24.0912H88.9341V15.0496C88.9341 13.057 88.3226 11.328 85.8924 11.328C83.3284 11.328 82.3678 13.388 82.3678 15.4458V24.0906H78.2693V14.585C78.2693 12.6184 77.4483 11.328 75.4638 11.328C72.7651 11.328 71.703 13.2501 71.703 15.3805V24.0906H67.5991V8.13366Z"
            fill="currentColor"
          />
          <path
            d="M109.974 16.1134C109.974 18.6093 108.166 20.8989 105.151 20.8989C102.141 20.8989 100.328 18.6093 100.328 16.1134C100.328 13.6202 102.141 11.3227 105.151 11.3227C108.166 11.3227 109.974 13.6202 109.974 16.1134ZM96.3641 24.0906H100.264V21.6987H100.328C101.53 23.6207 103.681 24.4868 105.977 24.4868C111.03 24.4868 114.078 20.8305 114.078 16.1129C114.078 11.3927 110.827 7.73426 106.144 7.73426C103.069 7.73426 101.423 9.12699 100.57 10.1649H100.467V0H96.3636L96.3641 24.0906Z"
            fill="currentColor"
          />
          <path
            d="M120.038 14.5177C120.344 12.2201 121.851 10.7261 124.276 10.7261C126.84 10.7261 128.412 12.1894 128.45 14.5177H120.038ZM132.554 17.5089V16.4137C132.554 10.8592 129.442 7.73486 124.861 7.73486C119.893 7.73486 115.934 11.0936 115.934 16.1135C115.934 21.1334 119.893 24.4874 124.861 24.4874C127.452 24.4874 129.887 23.5905 131.797 21.3004L128.857 19.144C127.833 20.3675 126.497 21.3004 124.447 21.3004C122.157 21.3004 120.306 19.869 120.038 17.5089H132.554Z"
            fill="currentColor"
          />
          <path
            d="M135.225 8.13366H139.329V10.6608H139.399C140.289 8.83268 142.097 7.73218 144.253 7.73218C144.768 7.73218 145.246 7.83401 145.723 7.96925V11.8239C145.042 11.6595 144.387 11.5264 143.738 11.5264C139.875 11.5264 139.328 14.6868 139.328 15.5529V24.0912H135.224L135.225 8.13366Z"
            fill="currentColor"
          />
          <path
            d="M154.903 11.328C157.875 11.328 159.757 13.2501 159.757 16.0164C159.757 18.6714 157.912 20.7 154.87 20.7C152.102 20.7 150.047 18.6062 150.047 16.079C150.047 13.2501 152.027 11.328 154.903 11.328ZM159.757 8.13366V10.5277H159.693C158.492 8.59773 156.335 7.73218 154.045 7.73218C148.986 7.73218 145.944 11.3906 145.944 16.1135C145.944 20.63 149.194 24.289 154.114 24.289C156.169 24.289 158.288 23.5274 159.49 21.9655H159.548V23.1312C159.548 26.2863 158.325 28.4826 154.356 28.4826C152.065 28.4826 150.353 27.6478 148.712 26.1771L146.255 29.4415C148.572 31.4441 151.345 32.0705 154.393 32.0705C160.788 32.0705 163.657 28.4094 163.657 22.6613V8.13366H159.757Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_1_1734">
            <rect width="163.657" height="32.0704" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    textLeft: "What makes M.Labs different is ",
    textMain:
      "how it turns creator discovery into a clear, business-ready campaign process",
    textRight: ", without slowing brands down.",
    author: "Vivian Hart",
    role: "Strategy Editor, Business Insider",
    svg: (
      <svg
        width="103"
        height="32"
        viewBox="0 0 103 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby="title desc"
      >
        <title id="title">Business Insider</title>
        <desc id="desc">Business Insider wordmark logo</desc>

        <g clipPath="url(#clip0_business_insider)">
          <path
            d="M7.984 32h2.396V19.2H7.984zM16.767 31.808h2.146v-8.076L27.946 32V19.392h-2.14v7.938l-9.039-8.13zM32.845 28.708c1.168.91 2.57 1.436 4.073 1.436 1.464 0 2.491-.504 2.491-1.617 0-.97-.655-1.35-1.802-1.775l-1.857-.645c-1.712-.608-3.014-1.496-3.014-3.537 0-2.183 1.971-3.37 4.328-3.37 1.444 0 2.76.363 3.788 1.006v2.165c-1.069-.79-2.239-1.334-3.742-1.334-1.294 0-2.261.483-2.261 1.49 0 .91.607 1.274 1.676 1.64l2.069.726c2.005.705 2.925 1.798 2.925 3.596 0 2.262-1.99 3.511-4.601 3.511-1.716 0-3.175-.48-4.073-1.086v-2.206zM47.109 32h2.395V19.2h-2.395zM60.74 30.063c2.7 0 4.143-1.732 4.143-4.466 0-2.754-1.444-4.48-4.143-4.48h-2.67v8.946h2.67zM55.89 19.2h4.93c3.795 0 6.249 2.5 6.249 6.397 0 3.9-2.454 6.403-6.249 6.403h-4.93V19.2zM79.047 19.2v1.917H73.25v3.08h5.199v1.895h-5.2v3.971h5.798V32h-7.985V19.2zM87.549 24.996h2.377c1.407 0 2.2-.772 2.2-1.959s-.793-1.96-2.2-1.96h-2.377v3.92zm0 1.81V32h-2.115V19.2h4.532c2.584 0 4.256 1.331 4.256 3.837 0 2.143-.928 3.374-2.905 3.69L95.814 32h-2.406l-4.354-5.193H87.55zM7.147 6.59c.937-.343 1.667-1.372 1.667-2.787 0-2.358-1.667-3.58-4.334-3.58H0v13.163h4.896c2.667 0 4.334-1.308 4.334-3.773 0-1.394-.875-2.616-2.083-3.023zm-5.043-.836V2.153H4.46c1.48 0 2.271.536 2.271 1.779 0 1.243-.792 1.822-2.271 1.822H2.104zm0 1.844h2.75c1.46 0 2.251.728 2.251 1.929 0 1.179-.792 1.93-2.25 1.93h-2.75v-3.86zM19.005 13.6c3.063 0 5.126-1.844 5.126-5.445V.223h-2.167v7.674c0 2.53-1.042 3.71-2.959 3.71s-2.958-1.18-2.958-3.71V.223H13.88v7.91c0 3.623 2.083 5.467 5.125 5.467zm10.228-1.158c.896.644 2.355 1.158 4.063 1.158 2.605 0 4.584-1.33 4.584-3.73 0-1.908-.916-3.066-2.917-3.816l-2.062-.772c-1.063-.385-1.667-.771-1.667-1.736 0-1.072.958-1.586 2.25-1.586 1.5 0 2.667.578 3.73 1.415V1.08C36.193.395 34.88.009 33.442.009c-2.354 0-4.313 1.265-4.313 3.58 0 2.165 1.292 3.108 3 3.751l1.855.686c1.146.45 1.792.858 1.792 1.887 0 1.179-1.021 1.715-2.48 1.715-1.5 0-2.896-.558-4.063-1.522v2.336zM45.623.223h-2.166v13.162h2.166V.223zm6.182 13.146h2.088V4.806l8.788 8.767V.203h-2.082V8.62L51.805 0v13.369zM76.222.226v1.971h-5.626v3.168h5.045v1.949h-5.045v4.083h5.626v1.992h-7.75V.226h7.75zm5.045 12.207c.896.644 2.354 1.158 4.063 1.158 2.604 0 4.584-1.329 4.584-3.73 0-1.908-.917-3.065-2.917-3.816l-2.063-.771c-1.063-.386-1.667-.772-1.667-1.737 0-1.072.958-1.586 2.25-1.586 1.5 0 2.667.579 3.73 1.415V1.072C88.226.386 86.913 0 85.475 0c-2.354 0-4.313 1.265-4.313 3.58 0 2.165 1.292 3.108 3 3.751l1.855.686c1.146.45 1.792.858 1.792 1.887 0 1.179-1.02 1.715-2.48 1.715-1.5 0-2.896-.557-4.062-1.522v2.336zm13.086 0c.896.644 2.355 1.158 4.063 1.158 2.605 0 4.584-1.329 4.584-3.73 0-1.908-.917-3.065-2.917-3.816l-2.063-.771c-1.062-.386-1.667-.772-1.667-1.737 0-1.072.959-1.586 2.25-1.586 1.5 0 2.668.579 3.73 1.415V1.072C101.313.386 100 0 98.562 0c-2.355 0-4.313 1.265-4.313 3.58 0 2.165 1.292 3.108 3 3.751l1.855.686c1.146.45 1.792.858 1.792 1.887 0 1.179-1.021 1.715-2.48 1.715-1.5 0-2.896-.557-4.063-1.522v2.336z"
            fill="currentColor"
          />
        </g>

        <defs>
          <clipPath id="clip0_business_insider">
            <rect width="103" height="32" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    textLeft: "We’ve seen brands use ",
    textMain:
      "M.Labs to move from scattered creator outreach to campaigns built around fit, timing, and measurable intent",
    textRight: ", setting a cleaner standard for influencer marketing.",
    author: "Marcus Ellery",
    role: "Business Columnist, Forbes",
    svg: (
      <svg
        width="200"
        height="54"
        viewBox="0 0 200 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby="title desc"
      >
        <title id="title">Forbes</title>
        <desc id="desc">Forbes wordmark logo</desc>

        <g clipPath="url(#clip0_forbes)">
          <path
            d="M113.3 18.2c0-5.8.1-11.2.4-16.2L98.4 4.9v1.4l1.5.2c1.1.1 1.8.5 2.2 1.1.4.7.7 1.7.9 3.2.2 2.9.4 9.5.3 19.9 0 10.3-.1 16.8-.3 19.3 5.5 1.2 9.8 1.7 13 1.7 6 0 10.7-1.7 14.1-5.2 3.4-3.4 5.2-8.2 5.2-14.1 0-4.7-1.3-8.6-3.9-11.7-2.6-3.1-5.9-4.6-9.8-4.6-2.6 0-5.3.7-8.3 2.1zm.3 30.8c-.2-3.2-.4-12.8-.4-28.5.9-.3 2.1-.5 3.6-.5 2.4 0 4.3 1.2 5.7 3.7 1.4 2.5 2.1 5.5 2.1 9.3 0 4.7-.8 8.5-2.4 11.7-1.6 3.1-3.6 4.7-6.1 4.7-.8-.2-1.6-.3-2.5-.4zM41 3H1v2l2.1.2c1.6.3 2.7.9 3.4 1.8.7 1 1.1 2.6 1.2 4.8.8 10.8.8 20.9 0 30.2-.2 2.2-.6 3.8-1.2 4.8-.7 1-1.8 1.6-3.4 1.8l-2.1.3v2h25.8v-2l-2.7-.2a4.9 4.9 0 0 1-3.4-1.8c-.7-1-1.1-2.6-1.2-4.8-.3-4-.5-8.6-.5-13.7l5.4.1c2.9.1 4.9 2.3 5.9 6.7h2V18.9h-2c-1 4.3-2.9 6.5-5.9 6.6l-5.4.1c0-9 .2-15.4.5-19.3h7.9c5.6 0 9.4 3.6 11.6 10.8l2.4-.7L41 3zm-4.7 30.8c0 5.2 1.5 9.5 4.4 12.9 2.9 3.4 7.2 5 12.6 5s9.8-1.7 13-5.2c3.2-3.4 4.7-7.7 4.7-12.9s-1.5-9.5-4.4-12.9c-2.9-3.4-7.2-5-12.6-5s-9.8 1.7-13 5.2c-3.2 3.4-4.7 7.7-4.7 12.9zm22.3-11.4c1.2 2.9 1.7 6.7 1.7 11.3 0 10.6-2.2 15.8-6.5 15.8-2.2 0-3.9-1.5-5.1-4.5-1.2-3-1.7-6.8-1.7-11.3C47 23.2 49.2 18 53.5 18c2.2-.1 3.9 1.4 5.1 4.4zm84.5 24.3c3.3 3.3 7.5 5 12.5 5 3.1 0 5.8-.6 8.2-1.9 2.4-1.2 4.3-2.7 5.6-4.5l-1-1.2c-2.2 1.7-4.7 2.5-7.6 2.5-4 0-7.1-1.3-9.2-4-2.2-2.7-3.2-6.1-3-10.5H170c0-4.8-1.2-8.7-3.7-11.8-2.5-3-6-4.5-10.5-4.5-5.6 0-9.9 1.8-13 5.3-3.1 3.5-4.6 7.8-4.6 12.9 0 5.2 1.6 9.4 4.9 12.7zm7.4-25.1c1.1-2.4 2.5-3.6 4.4-3.6 3 0 4.5 3.8 4.5 11.5l-10.6.2c.1-3 .6-5.7 1.7-8.1zm46.4-4c-2.7-1.2-6.1-1.9-10.2-1.9-4.2 0-7.5 1.1-10 3.2s-3.8 4.7-3.8 7.8c0 2.7.8 4.8 2.3 6.3 1.5 1.5 3.9 2.8 7 3.9 2.8 1 4.8 2 5.8 2.9 1 1 1.6 2.1 1.6 3.6 0 1.4-.5 2.7-1.6 3.7-1 1.1-2.4 1.6-4.2 1.6-4.4 0-7.7-3.2-10-9.6l-1.7.5.4 10c3.6 1.4 7.6 2.1 12 2.1 4.6 0 8.1-1 10.7-3.1 2.6-2 3.9-4.9 3.9-8.5 0-2.4-.6-4.4-1.9-5.9-1.3-1.5-3.4-2.8-6.4-4-3.3-1.2-5.6-2.3-6.8-3.3-1.2-1-1.8-2.2-1.8-3.7s.4-2.7 1.3-3.7 2-1.4 3.4-1.4c4 0 6.9 2.9 8.7 8.6l1.7-.5-.4-8.6zm-96.2-.9c-1.4-.7-2.9-1-4.6-1-1.7 0-3.4.7-5.3 2.1-1.9 1.4-3.3 3.3-4.4 5.9l.1-8-15.2 3v1.4l1.5.1c1.9.2 3 1.7 3.2 4.4.6 6.2.6 12.8 0 19.8-.2 2.7-1.3 4.1-3.2 4.4l-1.5.2v1.9h21.2V49l-2.7-.2c-1.9-.2-3-1.7-3.2-4.4-.6-5.8-.7-12-.2-18.4.6-1 1.9-1.6 3.9-1.8 2-.2 4.3.4 6.7 1.8l3.7-9.3z"
            fill="currentColor"
          />
        </g>

        <defs>
          <clipPath id="clip0_forbes">
            <rect width="200" height="54" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
];

export default function Press() {
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const prevIndexRef = useRef<number>(0);
  let initialTl = gsap.timeline({
    repeat: -1,
    overwrite: true,
  });

  function handleSlideChange(tl: gsap.core.Timeline, prevIndex: number, nextIndex: number, loop?: boolean) {
    tl.to(
      itemsRef.current[prevIndex],
      {
        opacity: 0,
        duration: 0.2,
        ease: "ease2.out",
        onStart: () => {
          prevIndexRef.current = nextIndex;
          buttonsRef.current[prevIndex]?.classList.remove(styles["active"]);
          buttonsRef.current[nextIndex]?.classList.add(styles["active"]);
        },
        onComplete: () => {
          itemsRef.current[prevIndex]?.classList.add("hidden");
        },
      },
      loop == true? "+=2": "",
    )
      .to(itemsRef.current[nextIndex], {
        opacity: 0,
        duration: 0,
        onComplete: () => {
          itemsRef.current[nextIndex]?.classList.remove("hidden");
        },
      })
      .to(itemsRef.current[nextIndex], {
        opacity: 1,
        duration: 0.3,
        ease: "ease2.in",
      });
  }

  function handleButtonInteraction(index: number) {
    if(!itemsRef.current[index]) return;
    if (prevIndexRef.current === index) return;
    initialTl.kill();
    const tl = gsap.timeline({
      onComplete: () => {
        tl.kill();
      },
    });
    handleSlideChange(tl, prevIndexRef.current, index);
  };

  useGSAP(() => {
    itemsRef.current[0]?.classList.remove("hidden");
    buttonsRef.current[0]?.classList.add(styles["active"]);
    gsap
      .timeline()
      .to(itemsRef.current[0], {
        opacity: 0,
        duration: 0,
        onComplete: () => {
          itemsRef.current[0]?.classList.remove("hidden");
        },
      })
      .to(itemsRef.current[0], {
        opacity: 1,
        duration: 0.3,
        ease: "ease2.in",
      });
    itemsRef.current.forEach((element, i) => {
      const nextElement = (i + 1) % itemsRef.current.length;
      if (!element) return;
      handleSlideChange(initialTl, i, nextElement, true);
    });
  });

  useEffect(() => {}, []);

  return (
    <section className="py-10 min-[426px]:pb-18 min-[426px]:pt-12" id="press">
      <div
        className="
          container mx-auto
          flex flex-col-reverse gap-8 lg:gap-18
          grid-cols-1 lg:grid lg:grid-cols-[5fr_3fr] px-6
        "
      >
        <AnimationWrapper>
        <div className="order-2 lg:order-1 flex flex-col justify-between min-h-100 min-[426px]:mt-6">
          <ul>
            {testimonials.map((t, i) => (
              <Testimonial
                key={i}
                textLeft={t.textLeft}
                textMain={t.textMain}
                textRight={t.textRight}
                author={t.author}
                role={t.role}
                refSetter={(el) => {
                  itemsRef.current[i] = el;
                }}
              />
            ))}
          </ul>
          <ul className="grid grid-cols-2 mt-4 md:grid-cols-4 gap-6 md:gap-9">
            {testimonials.map((t, i) => (
              <li key={i}>
                <PressOption
                  onButtonInteraction={() => {handleButtonInteraction(i);}}
                  btnRef={(el) => {
                    buttonsRef.current[i] = el;
                  }}
                >
                  {t.svg}
                </PressOption>
              </li>
            ))}
          </ul>
        </div>
        </AnimationWrapper>
        <div className="order-1 lg:order-2">
          <SubHeadline>the press</SubHeadline>
          <AnimationWrapper isHeadline isCodedHeadline>
          <h2 className="text-3xl min-[426px]:text-5xl">
            Trusted by press worldwide.
          </h2>
          </AnimationWrapper>
        </div>
      </div>
    </section>
  );
}
