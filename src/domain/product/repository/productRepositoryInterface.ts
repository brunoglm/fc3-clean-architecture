import RepositoryInterface from '../../@shared/repository/repositoryInterface'
import ProductInterface from '../entity/product-interface'

export default interface ProductRepositoryInterface
  extends RepositoryInterface<ProductInterface> {}
