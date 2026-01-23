import Image, { ImageProps } from "next/image";

export function SmartImage(props: ImageProps) {
  return (
    <Image
      {...props}
      placeholder={props.placeholder ?? "blur"}
      sizes={props.sizes ?? "(max-width: 768px) 100vw, 1200px"}
      className={["rounded-2xl", props.className].filter(Boolean).join(" ")}
    />
  );
}

export default SmartImage;
