import Big from 'big.js'
import { isCoverNum } from './type.js';

export const RoundType = {
  ROUND: 'round',
  FIXED: 'fixed'
}
export default function thousands(num, maxDecimal, isUndefinedShowDefault, roundType = RoundType.ROUND) {
  // 默认保留两位小数
  if (num === null || num === undefined || isCoverNum(num)) {
    return isUndefinedShowDefault || num;
  }
  let numStr = num.toString();
  if(roundType === RoundType.ROUND) {
    numStr = new Big(num).round(maxDecimal).toString()
  }

  const parts = numStr.split(".");
  if(roundType === RoundType.FIXED) {
    parts[1] = parts[1].slice(0, maxDecimal)
  }
  parts[0] = addCommas(parts[0])
  return parts.join(".");
}


function addCommas(numStr) {
   return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
