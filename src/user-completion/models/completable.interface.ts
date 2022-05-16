export interface Completable {
  isCompleted(): boolean;
  progressRate(): number;
}
