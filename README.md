# elec-sankey
A webcomponent to create sankey diagrams (typically for domestic electricity flow).

*This is an early version - currently experimental!*

This is also my first foray into creating a webcomponent, and not long after learning typescript. As a result: improvements/suggestions/PRs welcome!

## Key Features:
 - Configurable units
 - Configurable text
 - Configurable icons
 - Dynamic updates when used in the LitElement framework
 - Configurable colours
 - Label creation is basic but intended to be overridden by the subclass, e.g. to make labels clickable for more information.

## Example:
Example of this component styled within [Home Assistant](https://www.home-assistant.io/):

![image](https://github.com/davet2001/elec-sankey/assets/17680170/31eea146-c88a-4c10-900d-2aa1295aab5c)

## Design:
In general, the aim of this class is to display a coherent and informative visual representation of the flow of electricity. If a strange occurence occurs, such as consumption exceeding total input power, the class should attempt to display a sensible visual, including phantom sources or consumers to convey a complete diagram.

The reason for this is that the class is likely to receive asynchronous updates from different sensors. It must display a glitch-free best approximation of the reality until more information becomes available.

Internally, the class deliberately avoids making reference to power or energy because it can be used for either. By populating with power (W) values it represents power flow. By populating with energy (kWh) values it represents the energy flow over a period of time. 'rate' is used as a generic variable name that can be power/energy.

## Architecture note:
While written for home assistant, this class deliberately makes no reference to HA and is decoupled from it. It is designed to be subclassed within HA.
 
