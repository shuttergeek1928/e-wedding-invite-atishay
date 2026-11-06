export default function FloralCorners({
  variant = 'default',
}: {
  variant?: 'default' | 'compact'
}) {
  const cls = variant === 'compact' ? 'floral-corner floral-corner--compact' : 'floral-corner'

  return (
    <>
      <img
        src="/brand/floral-a.png?v=4"
        alt=""
        aria-hidden="true"
        className={`${cls} floral-corner--tr`}
      />
      <img
        src="/brand/floral-b.png?v=4"
        alt=""
        aria-hidden="true"
        className={`${cls} floral-corner--bl`}
      />
    </>
  )
}
