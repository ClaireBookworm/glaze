import React, { useState, useCallback, FormEvent, useEffect } from 'react'
import cx from 'classnames'

import useChat from '../hooks/useChat'

import '../scss/components/Chat.scss'

export default () => {
	const { isReady, isTyping, setIsTyping, messages, sendMessage } = useChat()
	const [message, setMessage] = useState('')
	
	const send = useCallback((event: FormEvent) => {
		event.preventDefault()
		
		sendMessage(message)
		setMessage('')
	}, [sendMessage, message])
	
	const onMessagesRef = useCallback((div: HTMLDivElement | null) => {
		if (div)
			div.scrollTop = div.scrollHeight
	}, [messages]) // eslint-disable-line
	
	const onInputRef = useCallback((input: HTMLInputElement | null) => {
		input?.focus()
	}, [message]) // eslint-disable-line
	
	useEffect(() => {
		setIsTyping(Boolean(message))
	}, [message, setIsTyping])
	
	return (
		<div className={cx('chat', { loading: !isReady })}>
			{isReady
				? (
					<>
						<button className="next">
							Next chat
						</button>
						<div ref={onMessagesRef} className="messages">
							<p className="header">
								This is the start of a beautiful thing.
							</p>
							{messages.map(({ id, didSend, data }) => (
								<p
									key={id}
									className={cx('message', { 'did-send': didSend })}
								>
									{data}
								</p>
							))}
							{isTyping && (
								<div className="typing-indicator">
									<span />
									<span />
									<span />
								</div>
							)}
						</div>
						<form onSubmit={send}>
							<input
								ref={onInputRef}
								placeholder="Say anything!"
								value={message}
								onChange={({ target: { value } }) => setMessage(value)}
							/>
							<button disabled={!message}>
								Send
							</button>
						</form>
					</>
				)
				: (
					<>
						<div className="loader" />
						<p>Searching for a stranger...</p>
					</>
				)
			}
		</div>
	)
}