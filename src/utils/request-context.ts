import { ClsStore } from 'nestjs-cls';

export interface RequestContext extends ClsStore {
  requestId: string;
  startTime: number;
  endTime: number;
}
