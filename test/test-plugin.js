import test from 'ava';
import posthtml from 'posthtml';
import isPromise from 'is-promise';
import spaceless from '../src/index.js';

function processing(html) {
	return posthtml()
		.use(spaceless())
		.process(html);
}

test('plugin must be function', t => {
	t.true(typeof spaceless === 'function');
});

test('should return reject', async t => {
	t.throws(spaceless()());
});

test('should return promise', t => {
	t.true(isPromise(processing('')));
});

test('should clone to attribute css module', async t => {
	const fixture = `
		<!DOCTYPE html>
		<html>
			<head></head>
			<body>
				<h2>Header</h2>
				<spaceless>
				<ul>
					<li>one</li>
					<li>two</li>
					<li>three</li>
				</ul>
				</spaceless>
			</body>
		</html>`;

	const expected = `
		<!DOCTYPE html>
		<html>
			<head></head>
			<body>
				<h2>Header</h2>
				<ul><li>one</li><li>two</li><li>three</li></ul>
			</body>
		</html>`;

	t.deepEqual(expected, (await processing(fixture)).html);
});
