<?php namespace Butler;

/**
 * Class AbstractFormat
 *
 * @author  AaronJan <https://github.com/AaronJan>
 * @package Butler
 */
abstract class AbstractFormat
{

    /**
     * @var string|array
     */
    protected $input;

    /**
     * @var string|array
     */
    protected $output;

    /**
     * @var string
     */
    protected $label;


    /*
     * Return UI specs
     *
     * @return array
     */
    abstract public function ui();

    /**
     *
     *
     * @param array $params
     * @return mixed
     */
    abstract public function format(array $params);

    /**
     * @param array $params
     * @return mixed
     */
    abstract public function reproduce(array $params);

    /**
     * Return the name of input parameter
     *
     * @return array
     */
    public function inputNames()
    {
        return is_array($this->input) ?: [$this->input];
    }

    /**
     * Return the name of input parameter
     *
     * @return array
     */
    public function outputNames()
    {
        return is_array($this->output) ?: [$this->output];
    }

    public function validate(array $rawParams)
    {

    }

}