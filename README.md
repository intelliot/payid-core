# payid-lib

Simple [PayID](https://payid.org/) utility functions

## Installation

```
$ yarn add payid-lib
```

or with npm:
```
$ npm install payid-lib
```

# payid-lib API Reference

## Functions

<dl>
<dt><a href="#parsePayId">parsePayId(payId)</a> ⇒</dt>
<dd><p>Parse a PayID into PayIdComponents.</p>
</dd>
<dt><a href="#isValidPayId">isValidPayId(payId)</a> ⇒</dt>
<dd><p>Check whether a string is syntactically a valid PayID.</p>
</dd>
<dt><a href="#resolvePayId">resolvePayId(payId, options)</a></dt>
<dd><p>Retrieve one or more addresses associated with a PayID.</p>
<p>By default, this retrieves all of a PayID&#39;s addresses by passing the <code>payid</code> network in the header of the request.</p>
<p>To retrieve an address for a particular payment network, set <code>options.network</code> to the desired PaymentNetwork.</p>
</dd>
</dl>

<a name="parsePayId"></a>

## parsePayId(payId) ⇒
Parse a PayID into PayIdComponents.

**Kind**: global function  
**Returns**: the PayIdComponents if the PayID is syntactically valid, otherwise `undefined`  

| Param | Description |
| --- | --- |
| payId | the PayID to parse |

<a name="isValidPayId"></a>

## isValidPayId(payId) ⇒
Check whether a string is syntactically a valid PayID.

**Kind**: global function  
**Returns**: `true` if the PayID is valid, otherwise `false`  

| Param | Description |
| --- | --- |
| payId | the PayID to check |

<a name="resolvePayId"></a>

## resolvePayId(payId, options)
Retrieve one or more addresses associated with a PayID.

By default, this retrieves all of a PayID's addresses by passing the `payid` network in the header of the request.

To retrieve an address for a particular payment network, set `options.network` to the desired PaymentNetwork.

**Kind**: global function  

| Param | Description |
| --- | --- |
| payId | The PayID to resolve for one or more addresses |
| options | Options object |
| options.network | The network to retrieve an address for |
| options.useInsecureHttp | If `true`, `http` will be used. Use for testing purposes only. Defaults to `false` |


## Development Environment

* Node.js LTS
* Yarn
* TypeScript
* Linting with eslint
* Testing with Jest
* Code coverage

## Scripts

* compile
  * Runs typescript (tsc) and outputs to `./dist`
* lint
  * Runs eslint (use `--fix` to automatically fix issues)
* test
  * Runs jest testing framework
* coverage
  * Collects code coverage information and outputs to `./coverage`
* docs
  * Generate README.md (from README.hbs and jsdoc2md)
