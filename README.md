# payid-core

Simple [PayID](https://payid.org/) utility functions

## Installation

```
$ yarn add payid-core
```

or with npm:
```
$ npm install payid-core
```

# payid-core API Reference

- [Click here for payid-core's full API reference including TypeScript interfaces and type aliases](https://intelliot.github.io/payid-core/modules/_index_.html)

## Functions

<dl>
<dt><a href="#parsePayId">parsePayId(payId)</a> ⇒ <code>PayIdComponents</code> | <code>undefined</code></dt>
<dd><p>Parse a PayID into PayIdComponents.</p>
</dd>
<dt><a href="#isValidPayId">isValidPayId(payId)</a> ⇒ <code>boolean</code></dt>
<dd><p>Check whether a string is syntactically a valid PayID.</p>
</dd>
<dt><a href="#resolvePayId">resolvePayId(payId, [options])</a> ⇒ <code>Promise</code></dt>
<dd><p>Retrieve one or more addresses associated with a PayID.</p>
<p>By default, this retrieves all of a PayID&#39;s addresses by passing the <code>payid</code> network in the header of the request.</p>
<p>To retrieve an address for a particular payment network, set <code>options.network</code> to the desired PaymentNetwork.</p>
</dd>
</dl>

<a name="parsePayId"></a>

## parsePayId(payId) ⇒ <code>PayIdComponents</code> \| <code>undefined</code>
Parse a PayID into PayIdComponents.

**Kind**: global function  
**Returns**: <code>PayIdComponents</code> \| <code>undefined</code> - the PayIdComponents if the PayID is syntactically valid, otherwise `undefined`  

| Param | Type | Description |
| --- | --- | --- |
| payId | <code>string</code> | the PayID to parse |

<a name="isValidPayId"></a>

## isValidPayId(payId) ⇒ <code>boolean</code>
Check whether a string is syntactically a valid PayID.

**Kind**: global function  
**Returns**: <code>boolean</code> - `true` if the PayID is valid, otherwise `false`  

| Param | Type | Description |
| --- | --- | --- |
| payId | <code>string</code> | the PayID to check |

<a name="resolvePayId"></a>

## resolvePayId(payId, [options]) ⇒ <code>Promise</code>
Retrieve one or more addresses associated with a PayID.

By default, this retrieves all of a PayID's addresses by passing the `payid` network in the header of the request.

To retrieve an address for a particular payment network, set `options.network` to the desired PaymentNetwork.

**Kind**: global function  
**Returns**: <code>Promise</code> - Promise resolves to PaymentInformation. If `useInsecureHttp` was set, then `usedInsecureHttp: true` will be set  
**Throws**:

- <code>Error</code> 'Invalid PayID' if `payId` is syntactically invalid;
                `${status} ${statusText} ${text}` if the response is not successful (status in the range 200-299)


| Param | Type | Description |
| --- | --- | --- |
| payId | <code>string</code> | The PayID to resolve for one or more addresses |
| [options] | <code>Object</code> | Options object |
| [options.network] | <code>PaymentNetwork</code> | The network to retrieve an address for |
| [options.useInsecureHttp] | <code>boolean</code> | If `true`, `http` will be used. Use for testing purposes only. Defaults to `false` |


# Development Environment

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
  * Generate README.md (from README.hbs and jsdoc2md) and `./docs` (with `typedoc`)
