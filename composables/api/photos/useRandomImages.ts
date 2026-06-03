export const useRandomImages = () => {
  const count = 10

  const getPicsumImages = (): string[] => {
    return Array.from({ length: count }, (_, i) => {
      return `https://picsum.photos/800/500?random=${i + 1}`
    })
  }

  const getGradientImages = (): string[] => {
    return Array.from({ length: count }, (_, i) => {
      return `https://via.assets.so/img.jpg?w=800&h=500&gradient=linear-gradient%28135deg%2C+%23ffecd2%2C+%23fcb69f%2C+%23a1c4fd%2C+%23c2e9fb%29&f=png&text=Slide+${i + 1}`
    })
  }

  return {
    picsumImages: getPicsumImages(),
    gradientImages: getGradientImages(),
  }
}
