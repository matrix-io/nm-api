/*
 * Copyright 2018 resin.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as Bluebird from 'bluebird';
import { NetworkManager } from '../../nm';

const routes = {
	/**
	 * Connect to a network by ssid/passphrase
	 *
	 * @param {Object} value Object containing ssid (string) and passphrase (string) props
	 */
	'connect-network': {
		method: 'POST',
		handler: async (nm: NetworkManager, req: any, res: any) => {
			try {
				const connection = req.body.value;
				await nm.connectNetwork(connection);
				res.status(200).json(connection);
			} catch (err) {
				res.status(err.code).json(err);
			}
			return Bluebird.resolve();
		},
	},
	/**
	 * List all nearby networks
	 */
	'list-nearby-networks': {
		method: 'GET',
		handler: async (nm: NetworkManager, req: any, res: any) => {
			try {
				const networks = await nm.listNearbyNetworks();
				res.status(200).json(networks);
			} catch (err) {
				res.status(err.code).json(err);
			}
			return Bluebird.resolve();
		},
	},
	/**
	 * Get the currently active wireless network ssid
	 */
	'current-network': {
		method: 'GET',
		handler: async (nm: NetworkManager, req: any, res: any) => {
			try {
				const ssid = await nm.getCurrentNetwork();
				res.status(200).json({ ssid });
			} catch (err) {
				res.status(err.code).json(err);
			}
			return Bluebird.resolve();
		},
	},
	/**
	 * Forget a network by ssid
	 *
	 * @param {Object} value * @param {Object} value Object containing the ssid prop (string)
	 */
	'forget-network': {
		method: 'POST',
		handler: async (nm: NetworkManager, req: any, res: any) => {
			try {
				const network = req.body.value;
				await nm.forgetNetwork(network);
				res.status(200).json(network);
			} catch (err) {
				return res.status(err.code).json(err);
			}
			return Bluebird.resolve();
		},
	},
	/**
	 * Toggle the WiFi Device
	 *
	 * @param {boolean} value boolean
	 */
	'toggle-wifi': {
		method: 'POST',
		handler: async (nm: NetworkManager, req: any, res: any) => {
			try {
				const value = req.body.value;
				const newValue = await nm.toggleWifi(value);
				res.status(200).json({ value: newValue });
			} catch (err) {
				res.status(err.code).json(err);
			}
			return Bluebird.resolve();
		},
	},
	/**
	 * Get the state of the WiFi Device (active: true/false)
	 */
	'get-wifi-active': {
		method: 'GET',
		handler: async (nm: NetworkManager, req: any, res: any) => {
			try {
				const State = await nm.getDeviceStatus(nm.devices.wifi);
				const active = State && (State !== NetworkManager.DEVICE_STATE.DISCONNECTED);
				res.status(200).json({ active });
			} catch (err) {
				res.status(err.code).json(err);
			}
			return Bluebird.resolve();
		},
	},
};

export default routes;
