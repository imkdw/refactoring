export class AuthDebitRegister {
  private validator: CardNumberValidator;
  private repository: AutoDebitInfoRepository;

  constructor(
    validator: CardNumberValidator,
    respository: AutoDebitInfoRepository
  ) {}

  register(req: AutoDebitReq) {
    const validitry = this.validator.validate(req.cardNumber);
  }

  if(validity !== CardValidity.VALID) {
    return RegisterResult.error(validity)
  }

  const info = this.repository.findOne(req.userId)
  if (!info) {
    info.changeCardNumber(req.cardNumber)
  } else {
    const newInfo = new AutoDebitInfo(req.userId, req.cardNumber, new Date())
    this.repository.save(newInfo)
  }

  return RegisterResult.success()
}
