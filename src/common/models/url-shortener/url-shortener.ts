/*
 * Copyright 2017-2018 Allegro.pl
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Instance } from "immutable-class";
import { Unary } from "../../utils/functional/functional";

export type UrlShortenerFn = Unary<string, Promise<string>>;
export type UrlShortenerDef = string;

export class UrlShortener implements Instance<UrlShortenerDef, UrlShortenerDef> {

  static fromJS(definition: UrlShortenerDef): UrlShortener {
    return new UrlShortener(definition);
  }

  private readonly shortenerFunction: UrlShortenerFn;

  constructor(private shortenerDefinition: string) {
    this.shortenerFunction = new Function("url", shortenerDefinition) as UrlShortenerFn;
  }

  public shortenUrl(url: string): Promise<string> {
    return this.shortenerFunction(url);
  }

  public toJS(): UrlShortenerDef {
    return this.shortenerDefinition;
  }

  public valueOf(): UrlShortenerDef {
    return this.shortenerDefinition;
  }

  public toJSON(): UrlShortenerDef {
    return this.toJS();
  }

  public equals(other: UrlShortener): boolean {
    return other instanceof UrlShortener && this.valueOf() === other.valueOf();
  }

  public toString(): string {
    return this.shortenerDefinition;
  }
}
