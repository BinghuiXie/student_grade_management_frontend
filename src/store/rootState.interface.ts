import { IIndexState } from './home/home.interface';
import { ISigninState } from './signin/signin.interface';

export interface IRootState {
    signin: ISigninState;
    home: IIndexState;
}