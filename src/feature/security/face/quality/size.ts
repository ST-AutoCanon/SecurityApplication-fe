// export interface FaceBoundingBox {
//   x: number;
//   y: number;
//   width: number;
//   height: number;
// }

// export interface FaceSizeResult {
//   width: number;
//   height: number;
//   area: number;
//   imageCoverage: number;
//   isValid: boolean;
// }

// export interface FaceSizeOptions {
//   minWidth?: number;
//   minHeight?: number;
//   minCoverage?: number; // Percentage (0-100)
// }

// export class FaceSizeChecker {
//   private readonly defaults: Required<FaceSizeOptions> = {
//     minWidth: 100,
//     minHeight: 100,
//     minCoverage: 8,
//   };

//   check(
//     bbox: FaceBoundingBox,
//     imageWidth: number,
//     imageHeight: number,
//     options: FaceSizeOptions = {}
//   ): FaceSizeResult {
//     const config = {
//       ...this.defaults,
//       ...options,
//     };

//     const area = bbox.width * bbox.height;
//     const imageArea = imageWidth * imageHeight;

//     const coverage = (area / imageArea) * 100;

//     const isValid =
//       bbox.width >= config.minWidth &&
//       bbox.height >= config.minHeight &&
//       coverage >= config.minCoverage;

//     return {
//       width: bbox.width,
//       height: bbox.height,
//       area,
//       imageCoverage: coverage,
//       isValid,
//     };
//   }

//   isTooSmall(
//     bbox: FaceBoundingBox,
//     options: FaceSizeOptions = {}
//   ): boolean {
//     const config = {
//       ...this.defaults,
//       ...options,
//     };

//     return (
//       bbox.width < config.minWidth ||
//       bbox.height < config.minHeight
//     );
//   }

//   isLargeEnough(
//     bbox: FaceBoundingBox,
//     imageWidth: number,
//     imageHeight: number,
//     options: FaceSizeOptions = {}
//   ): boolean {
//     return this.check(
//       bbox,
//       imageWidth,
//       imageHeight,
//       options
//     ).isValid;
//   }
// }

// export const faceSizeChecker = new FaceSizeChecker();

// export default faceSizeChecker;


export interface FaceBoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}


export type FaceSizeFailureReason =
  | "INVALID_IMAGE_SIZE"
  | "INVALID_FACE_BOX"
  | "FACE_WIDTH_TOO_SMALL"
  | "FACE_HEIGHT_TOO_SMALL"
  | "FACE_COVERAGE_TOO_LOW";


export interface FaceSizeResult {
  width: number;
  height: number;

  area: number;

  imageCoverage: number;

  widthRatio: number;

  heightRatio: number;

  isValid: boolean;

  reason?: FaceSizeFailureReason;
}


export interface FaceSizeOptions {

  /**
   * Minimum face width in pixels
   */
  minWidth?: number;


  /**
   * Minimum face height in pixels
   */
  minHeight?: number;


  /**
   * Minimum face coverage percentage
   */
  minCoverage?: number;
}



export class FaceSizeChecker {

  private readonly defaults: Required<FaceSizeOptions> = {

    minWidth: 100,

    minHeight: 100,

    minCoverage: 8,

  };



  check(
    bbox: FaceBoundingBox,
    imageWidth: number,
    imageHeight: number,
    options: FaceSizeOptions = {}
  ): FaceSizeResult {


    const config = {

      ...this.defaults,

      ...options,

    };



    /**
     * Validate image dimensions
     */
    if (
      imageWidth <= 0 ||
      imageHeight <= 0
    ) {

      return {

        width: bbox.width,

        height: bbox.height,

        area: 0,

        imageCoverage: 0,

        widthRatio: 0,

        heightRatio: 0,

        isValid: false,

        reason:
          "INVALID_IMAGE_SIZE",

      };

    }




    /**
     * Validate face bounding box
     */
    if (
      bbox.width <= 0 ||
      bbox.height <= 0
    ) {

      return {

        width: bbox.width,

        height: bbox.height,

        area: 0,

        imageCoverage: 0,

        widthRatio: 0,

        heightRatio: 0,

        isValid: false,

        reason:
          "INVALID_FACE_BOX",

      };

    }





    const area =
      bbox.width *
      bbox.height;



    const imageArea =
      imageWidth *
      imageHeight;



    const coverage =
      (area / imageArea) * 100;



    const widthRatio =
      (bbox.width / imageWidth) * 100;



    const heightRatio =
      (bbox.height / imageHeight) * 100;



    let reason:
      | FaceSizeFailureReason
      | undefined;



    if (
      bbox.width <
      config.minWidth
    ) {

      reason =
        "FACE_WIDTH_TOO_SMALL";

    }


    else if (
      bbox.height <
      config.minHeight
    ) {

      reason =
        "FACE_HEIGHT_TOO_SMALL";

    }


    else if (
      coverage <
      config.minCoverage
    ) {

      reason =
        "FACE_COVERAGE_TOO_LOW";

    }




    return {


      width:
        bbox.width,


      height:
        bbox.height,


      area,


      imageCoverage:
        Number(
          coverage.toFixed(2)
        ),


      widthRatio:
        Number(
          widthRatio.toFixed(2)
        ),


      heightRatio:
        Number(
          heightRatio.toFixed(2)
        ),



      isValid:
        reason === undefined,


      reason,

    };

  }





  isTooSmall(
    bbox: FaceBoundingBox,
    options: FaceSizeOptions = {}
  ): boolean {


    const config = {

      ...this.defaults,

      ...options,

    };


    return (

      bbox.width <
      config.minWidth

      ||

      bbox.height <
      config.minHeight

    );

  }






  isLargeEnough(
    bbox: FaceBoundingBox,

    imageWidth: number,

    imageHeight: number,

    options: FaceSizeOptions = {}

  ): boolean {


    return this.check(

      bbox,

      imageWidth,

      imageHeight,

      options

    ).isValid;


  }



}




export const faceSizeChecker =
  new FaceSizeChecker();



export default faceSizeChecker;