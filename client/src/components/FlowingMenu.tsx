import React from "react";
import { gsap } from "gsap";

interface MenuItemProps {
  link: string;
  foodName: string;
  image: string;
  description?: string;
}

interface FlowingMenuProps {
  items?: MenuItemProps[];
}

const FlowingMenu: React.FC<FlowingMenuProps> = ({ items = [] }) => {
  return (
    <div className="w-full h-full overflow-hidden font-sans bg-yellow-600 text-white">
      <nav className="flex flex-col h-full m-0 p-0">
        {items.map((item, idx) => (
          <MenuItem key={idx} {...item} />
        ))}
      </nav>
    </div>
  );
};

const MenuItem: React.FC<MenuItemProps> = ({
  link,
  foodName,
  image,
  description,
}) => {
  const itemRef = React.useRef<HTMLDivElement>(null);
  const marqueeRef = React.useRef<HTMLDivElement>(null);
  const marqueeInnerRef = React.useRef<HTMLDivElement>(null);
  const animationDefaults = { duration: 2, ease: "expo.out" };

  const findClosestEdge = (
    mouseX: number,
    mouseY: number,
    width: number,
    height: number
  ): "top" | "bottom" => {
    const topEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY, 2);
    const bottomEdgeDist =
      Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY - height, 2);
    return topEdgeDist < bottomEdgeDist ? "top" : "bottom";
  };

  const handleMouseEnter = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current)
      return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height
    );

    const tl = gsap.timeline({ defaults: animationDefaults });
    tl.set(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" })
      .set(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" })
      .to([marqueeRef.current, marqueeInnerRef.current], { y: "0%" });
  };

  const handleMouseLeave = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current)
      return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height
    );

    const tl = gsap.timeline({ defaults: animationDefaults });
    tl.to(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }).to(
      marqueeInnerRef.current,
      { y: edge === "top" ? "101%" : "-101%" }
    );
  };

  const repeatedMarqueeContent = React.useMemo(() => {
    return Array.from({ length: 4 }).map((_, idx) => (
      <React.Fragment key={idx}>
        <span
          className="text-gray-800 uppercase font-bold
                     text-[2.5vh] sm:text-[3vh] md:text-[3.8vh] leading-[1.2]
                     px-2 sm:px-4 py-1 sm:py-2 tracking-wide whitespace-nowrap"
        >
          {foodName}
        </span>
        <div
          className="w-[150px] h-[6vh] sm:w-[220px] sm:h-[8vh] md:w-[280px] md:h-[12vh]
                     mx-2 sm:mx-4 rounded-xl bg-cover bg-center  shadow-xl
                     transition-transform duration-900 hover:scale-105"
          style={{ backgroundImage: `url(${image})` }}
        />
        {description && (
          <p
            className="text-gray-700 text-[1.5vh] sm:text-[1.8vh] md:text-[2vh]
                       leading-[1.4] px-2 sm:px-4 max-w-[200px] sm:max-w-[250px] md:max-w-[300px] text-center"
          >
            {description}
          </p>
        )}
      </React.Fragment>
    ));
  }, [foodName, image, description]);

  return (
    <div
      className="flex-1 relative overflow-hidden text-center
                 py-2 sm:py-3 md:py-4 border-b border-gray-700 last:border-b
                 h-[12vh] sm:h-[15vh] md:h-[20vh] min-h-[90px] sm:min-h-[120px] md:min-h-[110px]
                 flex items-center justify-center"
      ref={itemRef}
    >
      <a
        className="flex items-center justify-center h-full relative cursor-pointer uppercase no-underline
                   font-extrabold text-white
                   text-[4vh] sm:text-[5vh] md:text-[6.5vh]
                   hover:text-yellow-400 focus:text-yellow-400
                   transition-colors duration-400 px-2 sm:px-4"
        href={link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {foodName}
      </a>
      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none
                   bg-gradient-to-r from-amber-300 to-orange-500 translate-y-[101%]"
        ref={marqueeRef}
      >
        <div className="h-full w-[200%] flex" ref={marqueeInnerRef}>
          <div className="flex items-center relative h-full w-[200%] will-change-transform animate-marquee">
            {repeatedMarqueeContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowingMenu;
