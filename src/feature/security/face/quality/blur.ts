// import type { FaceDetection } from "../types/detection";

// export interface BlurResult {
//   score: number;
//   isSharp: boolean;
// }

// /**
//  * Variance of Laplacian-based sharpness estimation.
//  * Higher score = sharper image.
//  */
// export class BlurDetector {
//   private readonly threshold: number;

//   constructor(threshold = 100) {
//     this.threshold = threshold;
//   }

//   check(
//     source:
//       | HTMLCanvasElement
//       | HTMLImageElement
//       | ImageBitmap
//       | HTMLVideoElement,
//       face: FaceDetection
//   ): BlurResult {
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d", {
//       willReadFrequently: true,
//     });

//     if (!ctx) {
//       throw new Error("Unable to create canvas context.");
//     }

//     const width =
//       source instanceof HTMLVideoElement
//         ? source.videoWidth
//         : source.width;

//     const height =
//       source instanceof HTMLVideoElement
//         ? source.videoHeight
//         : source.height;

//     // canvas.width = width;
//     // canvas.height = height;


//     canvas.width = Math.round(face.bbox.width);
//     canvas.height = Math.round(face.bbox.height);
    
//     // ctx.drawImage(source, 0, 0, width, height);
//     ctx.drawImage(
//   source,
//   face.bbox.x,
//   face.bbox.y,
//   face.bbox.width,
//   face.bbox.height,
//   0,
//   0,
//   face.bbox.width,
//   face.bbox.height
// );

//     const { data } = ctx.getImageData(0, 0, width, height);

//     const gray = new Float32Array(width * height);

//     for (let i = 0, j = 0; i < data.length; i += 4, j++) {
//       gray[j] =
//         0.299 * data[i] +
//         0.587 * data[i + 1] +
//         0.114 * data[i + 2];
//     }

//     const laplacian: number[] = [];

//     for (let y = 1; y < height - 1; y++) {
//       for (let x = 1; x < width - 1; x++) {
//         const c = y * width + x;

//         const value =
//           gray[c - width] +
//           gray[c - 1] +
//           gray[c + 1] +
//           gray[c + width] -
//           4 * gray[c];

//         laplacian.push(value);
//       }
//     }

//     const mean =
//       laplacian.reduce((a, b) => a + b, 0) /
//       laplacian.length;

//     let variance = 0;

//     for (const value of laplacian) {
//       const diff = value - mean;
//       variance += diff * diff;
//     }

//     variance /= laplacian.length;

//     return {
//       score: variance,
//       isSharp: variance >= this.threshold,
//     };
//   }
// }

// export const blurDetector = new BlurDetector();

// export default blurDetector;


import type { FaceDetection } from "../types/detection";


export interface BlurResult {
  score: number;
  isSharp: boolean;
}


export class BlurDetector {

  private readonly threshold: number;


  constructor(
    threshold = 60
  ) {
    this.threshold = threshold;
  }



  check(
    source:
      | HTMLCanvasElement
      | HTMLImageElement
      | ImageBitmap
      | HTMLVideoElement,

    face: FaceDetection

  ): BlurResult {


    const canvas =
      document.createElement("canvas");


    const ctx =
      canvas.getContext(
        "2d",
        {
          willReadFrequently:true
        }
      );


    if(!ctx){
      throw new Error(
        "Unable to create canvas context"
      );
    }



    const faceWidth =
      Math.round(
        face.bbox.width
      );


    const faceHeight =
      Math.round(
        face.bbox.height
      );



    if(
      faceWidth <=0 ||
      faceHeight <=0
    ){
      return {
        score:0,
        isSharp:false
      };
    }



    /**
     * Crop only face region
     */
    canvas.width =
      faceWidth;


    canvas.height =
      faceHeight;



    ctx.drawImage(

      source,

      face.bbox.x,
      face.bbox.y,

      face.bbox.width,
      face.bbox.height,


      0,
      0,

      faceWidth,
      faceHeight

    );




    const {
      data
    } =
      ctx.getImageData(
        0,
        0,
        faceWidth,
        faceHeight
      );



    const gray =
      new Float32Array(
        faceWidth * faceHeight
      );



    for(
      let i=0,j=0;
      i<data.length;
      i+=4,j++
    ){

      gray[j] =
        0.299 * data[i] +
        0.587 * data[i+1] +
        0.114 * data[i+2];

    }




    const laplacian:number[] = [];



    for(
      let y=1;
      y<faceHeight-1;
      y++
    ){

      for(
        let x=1;
        x<faceWidth-1;
        x++
      ){


        const index =
          y * faceWidth + x;



        const value =

          gray[index-faceWidth] +

          gray[index-1] +

          gray[index+1] +

          gray[index+faceWidth] -

          4 * gray[index];



        laplacian.push(value);

      }

    }




    const mean =
      laplacian.reduce(
        (a,b)=>a+b,
        0
      )
      /
      laplacian.length;




    const variance =
      laplacian.reduce(
        (sum,value)=>{

          const diff =
            value - mean;

          return sum + diff * diff;

        },
        0
      )
      /
      laplacian.length;




    return {

      score:
        Number(
          variance.toFixed(2)
        ),


      isSharp:
        variance >= this.threshold

    };


  }

}



export const blurDetector =
// new BlurDetector();
    new BlurDetector(10);



export default blurDetector;