import { Children } from './children.interface';

export interface Parent {
  getChildren(): Children[];
}
