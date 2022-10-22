export function howMuchTimePassed (since: Date): Number {
  return Date.now() - since.getTime()
}
