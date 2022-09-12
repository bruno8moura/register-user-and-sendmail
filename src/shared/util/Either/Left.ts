import { Right } from '@/shared/util/Either/Right'

export class Left<L, A> {
    readonly value: L

    constructor (value: L) {
      this.value = value
    }

    isLeft (): this is Left<L, A> {
      return true
    }

    isRight (): this is Right<L, A> {
      return false
    }
}
