import type { ComponentType, SVGProps } from 'react';
import { Pose0_HangingConfidently } from './Pose0_HangingConfidently';
import { Pose1_OnePawSlipping } from './Pose1_OnePawSlipping';
import { Pose2_WhiskersFlatten } from './Pose2_WhiskersFlatten';
import { Pose3_HindLegsKick } from './Pose3_HindLegsKick';
import { Pose4_OnePawOnly } from './Pose4_OnePawOnly';
import { Pose5_MidFall } from './Pose5_MidFall';
import { Pose6_Landed } from './Pose6_Landed';

export {
  Pose0_HangingConfidently,
  Pose1_OnePawSlipping,
  Pose2_WhiskersFlatten,
  Pose3_HindLegsKick,
  Pose4_OnePawOnly,
  Pose5_MidFall,
  Pose6_Landed,
};

export type CatPoseComponent = ComponentType<SVGProps<SVGSVGElement>>;

export const CAT_POSES: readonly CatPoseComponent[] = [
  Pose0_HangingConfidently,
  Pose1_OnePawSlipping,
  Pose2_WhiskersFlatten,
  Pose3_HindLegsKick,
  Pose4_OnePawOnly,
  Pose5_MidFall,
  Pose6_Landed,
] as const;
