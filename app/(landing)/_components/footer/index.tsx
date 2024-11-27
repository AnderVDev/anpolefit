import {
  ChatBubbleLeftRightIcon,
  ChatBubbleLeftIcon,
  PaperAirplaneIcon,
  RssIcon,
  MicrophoneIcon,
} from "@heroicons/react/24/solid";
import Image from 'next/image';
const button_menu = "bg-hotpink rounded-full text-lg text-white px-2";

// type Props = {};

const iconStyle= `gap-2 my-5 flex`;

const Footer = () => {
  return (
    <footer className="bg-primary-100 py-16">
      <div className="justify-content mx-auto w-5/6 gap-16 md:flex">
        <div className="mt-16 basis-1/2 md:mt-0">
        <Image
                  src="/assets/LogoAnpolefit_8.png"
                  alt="logo"
                  width={350} // Set appropriate width
                  height={200} // Set appropriate height
                />
          <p className="my-5">
          Each class in our gym is designed to inspire, challenge, and support you in your transformation process, both physically and emotionally. Here, every movement has a purpose, and every class is an opportunity to connect with yourself and with other women who are on the same journey.
          </p>
          <small>©Anpolefit All Rights Reserved.</small>
        </div>
        <div className="mt-16 basis-1/4 md:mt-0">
          <h4 className="font-bold">This is a Link</h4>
          <p className={iconStyle}>
          <ChatBubbleLeftRightIcon className="h-6 w-6" />
            This is a Link
          </p>
          <p className={iconStyle}>
          <PaperAirplaneIcon className="h-6 w-6 rotate-[-45deg]" />
            Telegram Group
          </p>
          <p className={iconStyle}>
            <RssIcon className="h-6 w-6"/>
            This is another Link
            </p>
          <p className={iconStyle}>
            <MicrophoneIcon className="h-6 w-6" />
            Lorem ipsum dolor
            </p>
        </div>
        <div className="mt-16 basis-1/4 md:mt-0">
        
          <h4 className="font-bold">News Letter</h4>
          <p className="my-5">
          Subscribe to our newsletter and stay up to date with news, tips, and updates on how to live a healthy lifestyle and achieve your wellness goals.
          </p>
          <p className="my-5 flex gap-2">
            



          <form className="max-w w-full">
  <div className="mb-5">
    <label for="email" class="block mb-1 text-sm font-medium text-hotpink">Your email</label>
    <input type="email" id="email" className="bg-white mb-2 bg-opacity-20 border-2 border-hotpink text-white text-sm rounded-3xl  block w-full p-1.5 " placeholder="name@mail.com" required />
  </div>

  {/* BUTTON */}
  <div className="relative mt-8">
            <div className={`${button_menu} gap-8 w-32 mt-0 text-center`}>
                  <a href="/login">Subscribe</a>
                </div>
            </div>
</form>








          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;