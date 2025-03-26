import path from 'path';

export class PathBuilder {
  private segments: string[];

  constructor(...initial: string[]) {
    this.segments = initial;
  }

  append(...parts: string[]) {
    this.segments.push(...parts);
    return this;
  }

  up(level: number = 1) {
    while (level-- > 0) this.segments.push('..');
    return this;
  }

  toString(): string {
    return path.join(...this.segments);
  }

  resolveFrom(base: string): string {
    return path.resolve(base, ...this.segments);
  }

  dirname(): string {
    return path.dirname(this.toString());
  }
}
